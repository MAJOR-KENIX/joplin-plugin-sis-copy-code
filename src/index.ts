import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function () {
		const contentScriptId = 'net.sis-soft.copyCode';
		await joplin.contentScripts.register(ContentScriptType.MarkdownItPlugin, contentScriptId, './sisCopy.js');
		await joplin.contentScripts.onMessage(contentScriptId, (sms: string) => {
			joplin.clipboard.writeText(sms);
			return `${contentScriptId}+${Date.now().toString()}`;
		});
	},
});