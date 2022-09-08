import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Feed = () => {

	const read = () => {
		confirmAlert({
			title: <strong> What's new</strong>,
			message: <i>In monday 23 august there Will he a presentation from project management regardina the theater platform. Please prepare the necessary documents. In monday 23 august there Will he a presentatio from project management regardina the theater platform. Please prepare the necessary documents.In monday 23 august there Will he a presentation from project management regardina the theater platform. Please prepare the necessary documents. In monday 23 august there Will he a presentatio from project management regardina the theater platform. Please prepare the necessary documents.In monday 23 august there Will he a presentation from project management regardina the theater platform. Please prepare the necessary documents. In monday 23 august there Will he a presentatio from project management regardina the theater platform. Please prepare the necessary documents.</i>,
			buttons: [
			  {
				label: 'OK',
				onClick: () => alert('Click Yes')
			  },
			  {
				label: 'Cancel',
				onClick: () => alert('Click No')
			  }
			]
			
		  });
	}

	return (
		<div className="flex m-2 py-4">
			<div className="flex flex-[1] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">20 August 2021</div>
				<div className="text-xs font-light">
					<div>posted by</div>
					<div>Antonio Gallo</div>
				</div>
			</div>
			<div className="flex flex-[3] flex-col gap-2 p-2">
				<div className="text-sm font-semibold">
					Project Management Presentation
				</div>
				<div className="text-xs font-light">
					In monday 23 august there Will he a presentation from project
					management regardina the theater platform. Please prepare the
					necessary documents. In monday 23 august there Will he a presentation
					from project management regardina the theater platform. Please prepare
					the necessary documents.
				</div>
			</div>
			<div className="flex flex-[1] p-2">
				<button onClick={read} className="flex h-fit text-sm font-semibold underline cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ...">
					Read More
				</button>
			</div>
		</div>
	);
};

export default Feed;
