import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../../services/axios';
import { setTopicCounts } from '../../../store/reducers/topicCountsSlice';

const fetcher = (url) => request({ method: "get", url }).then((res) => res.data.payload);

export const useTopicCounts = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.token);
  
  const { data: allPosts, error } = useSWR(
    isAuthenticated ? 'api/get/all/posts' : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
      onSuccess: (data) => {
        if (data) {
          const topicKeys = [
            'language_learning',
            'travel_and_tourism',
            'culture',
            'food',
            'places',
            'history',
            'famous_people',
            'personal_stories',
            'daily_life',
            '30_day_streak',
            '100_day_streak',
            '100_input_hours',
            'questions',
            'answers',
            'saved'
          ];
          
          const counts = {};
          topicKeys.forEach(key => {
            counts[key] = data.filter(post =>
              post.tags?.some(tag => tag.name === key)
            ).length;
          });
          dispatch(setTopicCounts(counts));
        }
      }
    }
  );

  return { error };
};