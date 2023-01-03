export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","global.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-2fc562fd.js","imports":["_app/immutable/start-2fc562fd.js","_app/immutable/chunks/index-9fa92e69.js","_app/immutable/chunks/singletons-ccfa0350.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
