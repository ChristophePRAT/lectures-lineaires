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
				<div className="flex-col flex-auto w-1/4 m-5 overflow-hidden text-white rounded-lg shadow-lg shrink-0 p-x-4 h-fit">
					<div className="flex justify-between w-full p-2 text-lg font-bold bg-blue-500">
						<h2>{data.title}</h2>
						{ 
							data.access_level > 1 && 
								<RowMenu onEdit={data.onEdit} onDelete={onDelete} />
						}
					</div>
					<div className="m-3">
						<iframe src={data.videoLink} className="w-full h-fit" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
