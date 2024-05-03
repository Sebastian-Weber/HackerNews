import StoryText from "./StoryText.jsx";

function NewsEntry(props) {

	let d = new Date(props.created_at);
	const year = d.getFullYear()
	const month = `${d.getMonth() + 1}`.padStart(2, "0")
	const day = `${d.getDate()}`.padStart(2, "0")
	const hours = `${d.getHours()}`.padStart(2, "0")
	const minutes = `${d.getMinutes()}`.padStart(2, "0")
	const stringDate = [day, month, year].join(".") + ' - ' + [hours, minutes].join(":");

	const title = (
		<span>{props.title}</span>
	);

	const title_link = (
		<a href={props.url} target="_blank" className="block hover:underline">{props.title}</a>
	);

	return (
		<div className="p-2 even:bg-orange-100 odd:bg-orange-50">
			<h2>{props.url ? title_link : title}</h2>
			<span className="block text-sm">
				Author: <a href="#" className="underline">{props.author}</a>&nbsp; |&nbsp;
				Post date: {stringDate}&nbsp; | &nbsp;
				<a href="#" className="underline">{props.num_comments} {props.num_comments === 1 ? 'Comment' : 'Comments'}</a>&nbsp; |&nbsp;
				ID {props.story_id}
			</span>
			{props.story_text && <StoryText html={props.story_text}/>}
		</div>
	)

}

export default NewsEntry;
