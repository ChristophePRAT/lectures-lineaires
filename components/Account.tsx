
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import useLocalStorage from '../utils/useLocalStorage';

enum AccessLevel {
	Unauthenticated = -1,
	Viewer = 0,
	Contributor = 1,
	Admin = 2,
}

function Account({session} : { session: any}) {
	const [loading, setLoading] = useState(true)
	const [accessLevel, setAccessLevel] = useState<AccessLevel>(AccessLevel.Unauthenticated);

	useEffect(() => {
		getProfile()
	}, [session])
	async function createProfile() {
		const profile = {
			id: session.user.id,
			email: session.user.email,
			access_level: 0
		}
		const { error } = await supabase
		.from('profiles')
		.upsert(profile, {
			returning: 'minimal', // Don't return the value after inserting
		})
		if (error) {
			console.log(error)
		}
		console.log("Should have added user")
	}
	async function getProfile() {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			if (!user?.id) {
				setLoading(false)
				return
			}
			let { data, error, status } = await supabase
			.from('profiles')
			.select(`access_level`)
			.eq('id', user.id!)
			.single()

			if (error && status !== 406) {
				throw error
			} else if (status === 406) {
				console.log("No account yet")
				createProfile()
			}

			if (data) {
				setAccessLevel(data.access_level)
			}
		} catch (error: any) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="form-widget">
			<div>
				<label htmlFor="email">Adresse mail</label>
				<input className="px-3" id="email" type="text" value={session.user.email} disabled />
			</div>
			<div>
				<label htmlFor="access_level">Niveau d&apos;accès</label>
				<input className="px-3" id="access_level" type="text" value={accessLevel} title={AccessLevel[accessLevel]} disabled />
			</div>
			<div>
				<button className="block button buttonDefault" onClick={() => supabase.auth.signOut()}>
					Se déconnecter
				</button>
			</div>
		</div>
	)
}


export default Account
