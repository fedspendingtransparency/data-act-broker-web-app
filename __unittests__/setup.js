import { jsdom } from 'jsdom';
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
	userAgent: 'node.js'
};