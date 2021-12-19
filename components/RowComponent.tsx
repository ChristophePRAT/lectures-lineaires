import { useState, useEffect } from 'react'
import HTMLDisclosure from './HTMLDiscolusre'

const RowComponent = (data: { title: string, extract: string, videoLink: string, introduction: string, explanation: string }) => {
	return (
		<div className="flex-col flex-auto w-1/4 m-5 overflow-hidden text-white rounded-lg shadow-lg shrink-0 p-x-4 h-fit">
			<h2 className="w-full p-2 text-lg font-bold bg-blue-500">{data.title}</h2>
			<div className="m-3">
				<iframe src={data.videoLink} className="w-full h-fit" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				<HTMLDisclosure title="Extrait" html={data.extract} />
				<HTMLDisclosure title="Introduction" html={data.introduction} />
				<HTMLDisclosure title="Explication" html={data.explanation} />
			</div>
		</div>
	)
}

export default RowComponent
