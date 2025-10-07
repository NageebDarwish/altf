import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

// Global registry to track active subscriptions
const activeSubscriptions = new Map();
let pusherInstance = null;

const PusherCustom = (channelName, eventName, callback) => {
  const callbackRef = useRef(callback);
  const subscriptionKeyRef = useRef(`${channelName}-${eventName}`);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Initialize Pusher singleton if not already initialized
    if (!pusherInstance) {
      pusherInstance = new Pusher("19aade7e0b3022777714", {
        cluster: "ap1",
        encrypted: true,
      });
    }

    const subscriptionKey = subscriptionKeyRef.current;

    // Check if this channel-event combination is already subscribed
    if (!activeSubscriptions.has(subscriptionKey)) {
      // Subscribe to channel
      const channel = pusherInstance.subscribe(channelName);

      // Store subscription info
      activeSubscriptions.set(subscriptionKey, {
        channel,
        callbacks: new Set([callbackRef]),
        refCount: 1,
      });

      // Bind event with a wrapper that calls all registered callbacks
      const eventHandler = (data) => {
        const subscription = activeSubscriptions.get(subscriptionKey);
        if (subscription) {
          subscription.callbacks.forEach((cbRef) => {
            if (cbRef.current) {
              cbRef.current(data);
            }
          });
        }
      };

      channel.bind(eventName, eventHandler);

      // console.log(`Subscribed to ${channelName} for event ${eventName}`);
    } else {
      // Add this callback to existing subscription
      const subscription = activeSubscriptions.get(subscriptionKey);
      subscription.callbacks.add(callbackRef);
      subscription.refCount += 1;

      // console.log(
      //   `Added callback to existing subscription for ${channelName}-${eventName}`
      // );
    }

    // Cleanup function
    return () => {
      const subscription = activeSubscriptions.get(subscriptionKey);
      if (subscription) {
        // Remove this callback
        subscription.callbacks.delete(callbackRef);
        subscription.refCount -= 1;

        // If no more callbacks are registered, unsubscribe
        if (subscription.refCount <= 0 || subscription.callbacks.size === 0) {
          subscription.channel.unbind_all();
          pusherInstance.unsubscribe(channelName);
          activeSubscriptions.delete(subscriptionKey);

          // console.log(
          //   `Unsubscribed from ${channelName} for event ${eventName}`
          // );
        }
      }
    };
  }, [channelName, eventName]);

  return pusherInstance;
};

export default PusherCustom;
