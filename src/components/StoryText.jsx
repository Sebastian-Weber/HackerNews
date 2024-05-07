import DOMPurify from 'dompurify';

function StoryText({html}) {

	const sanitizedHTML = DOMPurify.sanitize(html);
	return (
		<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} className="mt-2 break-words"></div>
	)
}

export default StoryText;
