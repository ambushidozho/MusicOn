// sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');
import {NetworkFirst} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
self.__WB_DISABLE_DEV_LOGS = true;

workbox.routing.registerRoute(
	/https:\/\/musicon\.space/,
	new NetworkFirst()
);

workbox.routing.registerRoute(
	/https:\/\/api\.s3\.musicon\.space/,
	new NetworkFirst()
);

workbox.routing.registerRoute(
	new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
	new CacheFirst({
		cacheName: 'google-fonts',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 30,
			}),
			new CacheableResponsePlugin({
				statuses: [0, 200],
			})
		]
	})
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);