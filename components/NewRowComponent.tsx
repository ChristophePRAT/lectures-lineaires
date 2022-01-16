import { useState, useEffect } from 'react';
import { supabase, LectureLineaire } from '../utils/supabaseClient';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Dialog } from "@headlessui/react"
import styles from '../styles/NewRowComponent.module.scss';

function NewRowComponent(props: { 
	isOpen: boolean, 
	close: () => void, 
	lecture?: LectureLineaire,
}) {
	const [title, setTitle] = useState(props.lecture?.title ?? "");
	const [videoLink, setVideoLink] = useState(props.lecture?.videoLink ?? "");
	const [extract, setExtract] = useState(props.lecture?.extract.replaceAll("</p>", "</p>\n") ?? "");
	const [introduction, setIntroduction] = useState(props.lecture?.introduction.replaceAll("</p>", "</p>\n") ?? "");
	const [explanation, setExplanation] = useState(props.lecture?.explanation.replaceAll("</p>", "</p>\n") ?? "");
	useEffect(() => {
		console.log(props.lecture?.explanation)
		console.log("\n\n" + explanation)
	})

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
		if (props.lecture?.id) {
			const response = await supabase
			.from("LectureLineaire")
			.upsert([{
				id: props.lecture?.id,
				...newRow
			}])
		} else {
			const response = await supabase
			.from('LectureLineaire')
			.upsert([newRow]);
		}
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
					<h2 className={styles.sectionTitle}>Extrait</h2>
					<ReactQuill 
						theme="snow"
						value={extract}
						className={styles.textarea}
						onChange={(e: string) => setExtract(e)}
					/>
					<br />
					<h2 className={styles.sectionTitle}>Introduction</h2>
					<ReactQuill
						theme="snow"
						value={introduction}
						className={styles.textarea}
						onChange={(e: any) => setIntroduction(e)}
					/>
					<br />
					<h2 className={styles.sectionTitle}>Analyse</h2>
					<ReactQuill
						theme="snow"
						value={explanation}
						className={styles.textarea}
						onChange={(e: string) => setExplanation(e)}
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
