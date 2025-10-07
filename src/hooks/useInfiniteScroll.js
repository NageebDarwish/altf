import { useState, useEffect, useCallback, useRef } from 'react';
import { request } from '../services/axios';
import { createApiUrl, API_ENDPOINTS } from '../config/api';

/**
 * Custom hook for handling infinite scroll pagination
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Configuration options
 * @returns {Object} - Hook state and methods
 */
export const useInfiniteScroll = (endpoint, options = {}) => {
  const {
    initialPage = 1,
    perPage = 15,
    dependencies = [], // Dependencies that should trigger a reset
    enableAutoLoad = true,
    threshold = 0.1, // Intersection ratio (0-1) for when to trigger load
    scrollThreshold = 200, // Distance from bottom for manual scroll detection
    autoFillViewport = false, // If true, prefetch to fill viewport on first load
    rootSelector = null, // CSS selector for a scrollable container; defaults to window
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const observerRef = useRef();
  const lastElementRef = useRef();
  const skipFirstIntersectRef = useRef(true); // prevent immediate page 2 on first paint
  const hasUserScrolledRef = useRef(false);   // mark when user actually scrolls
  const scrollRootRef = useRef(null); // resolved scroll container element

  // Resolve scroll root element from selector (if provided)
  useEffect(() => {
    if (rootSelector) {
      const el = document.querySelector(rootSelector);
      if (el) scrollRootRef.current = el;
    } else {
      scrollRootRef.current = null;
    }
  }, [rootSelector]);

  // Track first user scroll to enable intersection loading
  // (defined after loadMore to avoid TDZ)

  // Reset pagination when dependencies change
  useEffect(() => {
    setData([]);
    setCurrentPage(initialPage);
    setHasMore(true);
    setError(null);
  }, [initialPage, ...dependencies]);

  // Load data function - requires explicit page to avoid re-runs when currentPage changes
  const loadData = useCallback(async (page, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const url = createApiUrl(endpoint);
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const requestUrl = `${url}?${params.toString()}`;
      const response = await request({
        url: requestUrl,
        method: 'GET',
      }, false);

      if (response?.status === 200) {
        const responseData = response.data;
        
        // Handle different response formats
        let newItems = [];
        let paginationInfo = {};

        if (responseData.payload) {
          // Paginated response format
          if (responseData.payload.data) {
            newItems = responseData.payload.data;
            paginationInfo = {
              // Rely on requested page rather than backend echo to avoid stale/current_page=1 issues
              currentPage: page,
              totalPages: responseData.payload.last_page,
              total: responseData.payload.total,
              hasMore: (
                (typeof responseData.payload.last_page === 'number' && page < responseData.payload.last_page) ||
                Boolean(responseData.payload.next_page_url)
              ),
            };
          } else {
            // Regular array response
            newItems = responseData.payload;
            paginationInfo = {
              currentPage: page,
              totalPages: 1,
              total: newItems.length,
              hasMore: false,
            };
          }
        } else if (Array.isArray(responseData)) {
          // Direct array response
          newItems = responseData;
          paginationInfo = {
            currentPage: page,
            totalPages: 1,
            total: newItems.length,
            hasMore: false,
          };
        }

        setData(prevData => isInitial ? newItems : [...prevData, ...newItems]);
        // Ensure we always advance the page we believe we're on
        setCurrentPage(paginationInfo.currentPage);
        setTotalPages(paginationInfo.totalPages);
        setTotal(paginationInfo.total);
        setHasMore(paginationInfo.hasMore);

        // After first successful initial load, allow intersection to trigger immediately
        if (isInitial) {
          skipFirstIntersectRef.current = false;
        }

        return { success: true, data: newItems, paginationInfo };
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
      return { success: false, error: err };
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [endpoint, perPage]);

  // Load initial data
  useEffect(() => {
    if (enableAutoLoad) {
      loadData(initialPage, true);
    }
    // loadData is stable (no dependency on currentPage), safe to include
  }, [enableAutoLoad, initialPage, loadData]);

  // Load more data
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    // Snapshot current document metrics before loading
    const prevDocHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;
    const prevScrollTop = typeof window !== 'undefined' ? (window.pageYOffset || document.documentElement.scrollTop) : 0;
    const prevBottom = typeof window !== 'undefined' ? (prevDocHeight - (prevScrollTop + window.innerHeight)) : 0;

    // Compute next page from latest state at call time
    const nextPage = currentPage + 1;

    // Optimistically update current page to prevent duplicate page=1 reloads
    setCurrentPage(nextPage);
    const res = await loadData(nextPage, false);

    // Preserve user's optical position by anchoring distance from bottom
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        const newDocHeight = document.documentElement.scrollHeight;
        const desiredTop = Math.max(0, newDocHeight - window.innerHeight - prevBottom);
        window.scrollTo({ top: desiredTop, behavior: 'auto' });
      });
    }

    return res;
  }, [loadingMore, hasMore, currentPage, loadData]);

  // Refresh data
  const refresh = useCallback(async () => {
    setData([]);
    setHasMore(true);
    setError(null);
    // Reset currentPage just-in-time before load
    setCurrentPage(initialPage);
    return await loadData(initialPage, true);
  }, [initialPage, loadData]);

  // Track first user scroll to enable intersection loading
  useEffect(() => {
    const onFirstScroll = () => {
      if (!hasUserScrolledRef.current) {
        hasUserScrolledRef.current = true;
        // If trigger is already visible when user first scrolls, manually load more
        try {
          const el = lastElementRef.current;
          if (el && !loadingMore && hasMore) {
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= winH + 50) {
              // allow first load
              skipFirstIntersectRef.current = false;
              loadMore();
            }
          }
        } catch {}
      }
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, [hasMore, loadingMore, loadMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!enableAutoLoad || !hasMore || loadingMore) return;

    // Validate and normalize threshold value
    const normalizedThreshold = Math.max(0, Math.min(1, Number(threshold) || 0.1));

    const observer = new IntersectionObserver(
      (entries) => {
        try {
          console.log('Intersection observer triggered:', entries);
          if (entries[0] && entries[0].isIntersecting) {
            // Skip the very first intersection until the user scrolls
            if (skipFirstIntersectRef.current && !hasUserScrolledRef.current) {
              skipFirstIntersectRef.current = false;
              // Force re-observe so that a subsequent visibility change will re-trigger
              if (lastElementRef.current) {
                observer.unobserve(lastElementRef.current);
                observer.observe(lastElementRef.current);
              }
              return;
            }
            console.log('Intersection detected, loading more...', {
              hasMore,
              loadingMore,
              currentPage,
              totalPages
            });
            loadMore();
          }
        } catch (error) {
          console.warn('Intersection Observer error:', error);
        }
      },
      { 
        threshold: 0, // trigger as soon as it appears
        root: scrollRootRef.current || null,
        rootMargin: '800px' // Trigger well before element comes into view
      }
    );

    // Add defensive check for element existence
    if (lastElementRef.current && document.contains(lastElementRef.current)) {
      observer.observe(lastElementRef.current);
      console.log('Observer attached to element');
    } else {
      console.log('Element not ready for observation');
    }

    observerRef.current = observer;

    return () => {
      try {
        if (observerRef.current) {
          observerRef.current.disconnect();
          console.log('Observer disconnected');
        }
      } catch (error) {
        console.warn('Observer cleanup error:', error);
      }
    };
  }, [enableAutoLoad, hasMore, loadingMore, threshold, loadMore, data.length]); // Added data.length to re-attach when data changes

  // Scroll fallback: trigger load when near bottom (works even if observer misses)
  useEffect(() => {
    if (!enableAutoLoad) return;

    let rafId;
    const onScroll = () => {
      if (!hasMore || loadingMore) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rootEl = scrollRootRef.current;
        if (rootEl) {
          const { scrollTop, scrollHeight, clientHeight } = rootEl;
          const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
          if (distanceFromBottom <= Math.max(300, scrollThreshold)) {
            loadMore();
          }
        } else {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const docHeight = document.documentElement.scrollHeight;
          const distanceFromBottom = docHeight - (scrollTop + windowHeight);
          if (distanceFromBottom <= Math.max(300, scrollThreshold)) {
            loadMore();
          }
        }
      });
    };

    const target = scrollRootRef.current || window;
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      (scrollRootRef.current || window).removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableAutoLoad, hasMore, loadingMore, scrollThreshold, loadMore]);

  // Scroll event listener for manual infinite scroll
  const handleScroll = useCallback((e) => {
    if (!enableAutoLoad || !hasMore || loadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < scrollThreshold) {
      loadMore();
    }
  }, [enableAutoLoad, hasMore, loadingMore, scrollThreshold, loadMore]);

  // Auto-fill viewport: if content height is too small, load more until threshold met (opt-in)
  useEffect(() => {
    if (!autoFillViewport || !enableAutoLoad || !hasMore || loading || loadingMore) return;

    const ensureScrollable = () => {
      const rootEl = scrollRootRef.current;
      if (rootEl) {
        const distance = rootEl.scrollHeight - rootEl.clientHeight;
        if (distance < 400) loadMore();
      } else {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        if (documentHeight - windowHeight < 400) loadMore();
      }
    };

    // Defer to next tick to allow DOM to paint
    const id = setTimeout(ensureScrollable, 50);
    return () => clearTimeout(id);
  }, [autoFillViewport, enableAutoLoad, hasMore, loading, loadingMore, data.length, loadMore]);

  return {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    currentPage,
    totalPages,
    total,
    loadMore,
    refresh,
    loadData,
    lastElementRef,
    handleScroll,
  };
};

/**
 * Hook for video-specific infinite scroll
 * @param {Object} options - Configuration options
 * @returns {Object} - Hook state and methods
 */
export const useInfiniteVideoScroll = (options = {}) => {
  return useInfiniteScroll(API_ENDPOINTS.videos.list, {
    perPage: 15,
    threshold: 0.1, // Very sensitive - trigger when 10% visible
    scrollThreshold: 300, // Trigger when 300px from bottom
    ...options,
  });
};

/**
 * Hook for filtered video infinite scroll
 * @param {Object} filters - Filter parameters
 * @param {Object} options - Configuration options
 * @returns {Object} - Hook state and methods
 */
export const useInfiniteFilteredVideoScroll = (filters = {}, options = {}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState(null);

  const applyFilters = useCallback(async (newFilters = filters) => {
    try {
      setFilterLoading(true);
      setFilterError(null);

      const response = await request({
        url: createApiUrl(API_ENDPOINTS.videos.filter),
        method: 'POST',
        data: {
          ...newFilters,
          page: 1,
          per_page: options.perPage || 15,
        },
      }, false);

      if (response?.status === 200) {
        const responseData = response.data;
        
        if (responseData.payload?.data) {
          setFilteredData(responseData.payload.data);
        } else {
          setFilteredData(responseData.payload || []);
        }
      }
    } catch (err) {
      console.error('Error applying filters:', err);
      setFilterError(err.message || 'Failed to apply filters');
    } finally {
      setFilterLoading(false);
    }
  }, [filters, options.perPage]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      applyFilters(filters);
    }
  }, [filters, applyFilters]);

  return {
    data: filteredData,
    loading: filterLoading,
    error: filterError,
    applyFilters,
    setFilteredData,
  };
};

export default useInfiniteScroll;
