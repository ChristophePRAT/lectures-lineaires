import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function RowMenu(props: { onDelete: ()=>void, onEdit: ()=>void, access_level: number }) {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					Options
					<ChevronDownIcon
						className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-2 bg-white shadow-lg origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={props.onEdit}
									className={`${
										active ? 'bg-blue-500 text-white' : 'text-gray-900'
									} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
								>
									{active ? (
										<EditActiveIcon
											className="w-5 h-5 mr-2"
											aria-hidden="true"
										/>
									) : (
										<EditInactiveIcon
											className="w-5 h-5 mr-2"
											aria-hidden="true"
										/>
									)}
									Changer
								</button>
							)}
						</Menu.Item>
						{ props.access_level > 2 &&
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={props.onDelete}
									className={`${
										active ? 'bg-red-500 text-white' : 'text-gray-900'
									} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
								>
									{active ? (
										<DeleteActiveIcon
											className="w-5 h-5 mr-2 text-white-400"
											aria-hidden="true"
										/>
									) : (
										<DeleteInactiveIcon
											className="w-5 h-5 mr-2 text-red-400"
											aria-hidden="true"
										/>
									)}
									Effacer
								</button>
							)}
						</Menu.Item>
						}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

function EditInactiveIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
		</svg>	
	)
}

function EditActiveIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
		</svg>
	)
}

function DeleteInactiveIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
		</svg>
	)
}

function DeleteActiveIcon(props: any) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
		</svg>
	)
}
