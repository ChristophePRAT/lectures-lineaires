import HTMLDisclosure from './HTMLDiscolusre'
import { supabase } from '../utils/supabaseClient'
import RowMenu from './RowMenu'
import { useState } from 'react'

const RowComponent = (data: { id: any, title: string, extract: string, videoLink: string, introduction: string, explanation: string, access_level: number, onEdit: ()=>void }) => {
	const [show, setShow] = useState(true)

	const onDelete = async() => {
		const { error } = await supabase.from("LectureLineaire")
		.delete({ returning: "minimal" })
		.eq("id", data.id)
		if (error) {
			console.log(error)
		} else {
			setShow(false)
		}
	}
	if (show) {
		return (
			<>
				<div className="flex-col flex-auto m-1 overflow-hidden text-white rounded-lg shadow-lg md:w-1/2 md:m-5 shrink-0 p-x-1 md:p-x-4 h-fit">
					<div className="flex items-center justify-between w-full p-2 text-lg font-bold bg-blue-500">
						<h2>{data.title}</h2>
						<div>
							<a href={data.videoLink} target="_blank" rel="noreferrer">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
							{ 
								data.access_level > 1 && 
									<RowMenu onEdit={data.onEdit} onDelete={onDelete} access_level={data.access_level} />
							}
						</div>
					</div>
					<div className="m-3">
						<iframe src={data.videoLink} className="hidden w-full h-fit md:block" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						<HTMLDisclosure title="Extrait" html={data.extract} />
						<HTMLDisclosure title="Introduction" html={data.introduction} />
						<HTMLDisclosure title="Explication" html={data.explanation} />
					</div>
				</div>
			</>
		)

	} else {
		return (<></>)
	}
}

export default RowComponent
