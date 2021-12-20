import HTMLDisclosure from './HTMLDiscolusre'
import { supabase } from '../utils/supabaseClient'
import useLocalStorage from '../utils/useLocalStorage'

const RowComponent = (data: { title: string, extract: string, videoLink: string, introduction: string, explanation: string, access_level: number }) => {
	{/*
		*const [accessLevel, setAccessLevel] = useLocalStorage('accessLevel')
		*/}
	return (
		<>
			<div className="flex-col flex-auto w-1/4 m-5 overflow-hidden text-white rounded-lg shadow-lg shrink-0 p-x-4 h-fit">
				<div className="flex justify-between w-full p-2 text-lg font-bold bg-blue-500">
					<h2>{data.title}</h2>
					{ 
						data.access_level > 1 && 
							<svg xmlns="http://www.w3.org/2000/svg" className="p-1 text-white bg-red-500 rounded-full w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
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
}

export default RowComponent
