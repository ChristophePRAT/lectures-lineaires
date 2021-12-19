import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Dialog } from "@headlessui/react"
import styles from '../styles/NewRowComponent.module.scss';

const NewRowComponent = (props: { isOpen: boolean, close: ()=>void }) => {
	const [title, setTitle] = useState('');
	const [extract, setExtract] = useState('');
	const [videoLink, setVideoLink] = useState('');
	const [introduction, setIntroduction] = useState('');
	const [explanation, setExplanation] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let videoURL = videoLink
		// if videoLink includes youtube
		if (videoLink.includes("youtube")) {
			const video = videoLink.replace("watch?v=", "embed/")
			console.log("New video url: " + videoLink)
			// change the beginning of the video link to https://youtube.com/embed/
			videoURL = video
		}
		console.log(videoURL + " vid url")
		const newRow = {
			title,
			extract,
			videoLink: videoURL,
			introduction,
			explanation
		};
		const response = await supabase
		.from('LectureLineaire')
		.insert([newRow]);
		console.log(response);
		props.close();
		setTitle('');
		setExtract('');
		setVideoLink('');
		setIntroduction('');
		setExplanation('');
	};

	return (
		<Dialog as="div" className="fixed inset-0 z-10 min-h-screen px-4 overflow-y-auto text-center" open={props.isOpen} onClose={() => props.close() }>
			<Dialog.Overlay className="fixed inset-0" />
			<div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
				<Dialog.Title className="text-lg font-bold">Nouvelle lecture linéaire</Dialog.Title>
				<form>
					<input 
						type="text" 
						placeholder="Titre" 
						className={styles.input}
						value={title} 
						onChange={(e: any) => setTitle(e.target.value)} 
					/>
					<input 
						type="text" 
						placeholder="Lien"
						className={styles.input}
						value={videoLink}
						onChange={(e: any) => setVideoLink(e.target.value)} 
					/> 
					<ReactQuill 
						theme="snow"
						value={extract}
						className={styles.textarea}
						onChange={(e: any) => setExtract(e)}
					/>
					<br />
					<ReactQuill
						theme="snow"
						value={introduction}
						className={styles.textarea}
						onChange={(e: any) => setIntroduction(e)}
					/>
					<br />
					<ReactQuill
						theme="snow"
						value={explanation}
						className={styles.textarea}
						onChange={(e: any) => setExplanation(e)}
					/>
					<br />
					<input 
						type="button" 
						value="Annuler" 
						className={styles.buttons} 
						onClick={() => props.close() } 
					/>
					<input 
						type="submit" 
						value="Sauvegarder"
						className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent cursor-pointer rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
						onClick={handleSubmit} 
					/>
				</form>
			</div>
		</Dialog>

	)
}

export default NewRowComponent;
