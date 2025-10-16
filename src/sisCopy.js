'use strict';

function insertHtml(source, index, content) { return source.slice(0, index) + content + source.slice(index); }

exports.default = function (context) {
	const pluginId = context.pluginId;

	return {
		plugin: function (markdownIt, _pluginOptions) {
			const defaultRenderFence = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) { return self.renderToken(tokens, idx, options, env, self); };

			markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
				const defaultHtml = defaultRenderFence(tokens, idx, options, env, self);
				const token = tokens[idx];
				const { tag } = token;

				if (tag !== 'code') return defaultHtml;

				const markerIndex = defaultHtml.lastIndexOf('</');
				if (markerIndex === -1) return defaultHtml;
				const copyButtonHtml = `<button class="sis-sms sisCode-button hljs" aria-label="Copy code" data-plugin-id="${pluginId}"></button>`;

				return insertHtml(defaultHtml, markerIndex, copyButtonHtml);
			};

			markdownIt.renderer.rules.code_inline = function (tokens, idx) {
				const token = tokens[idx];
				const sms = (token.content || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
				const defaultHtml = `<code>${sms}</code>`;
				const copyButtonHtml = `<button class="sis-sms sisCode-button hljs" aria-label="Copy code" data-plugin-id="${pluginId}" data-sms="${sms}"></button>`;

				return `<span class="sisCode-span">${defaultHtml}${copyButtonHtml}</span>`;
			};
		},

		assets: function () { return [{ name: 'sisCopy.css' }, { name: 'sisSms.js' }, { name: 'moveButton.js' }]; }
	};
};