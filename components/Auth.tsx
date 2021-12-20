import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')

	const handleLogin = async (email: string) => {
		try {
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
				alert('Mail de confirmation d\'adresse envoyé !')
		} catch (error: any) {
			alert(error.error_description || error.message)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		localStorage.setItem("access_level", JSON.stringify(-1))
	}, [])
	return (
		<div className="flex row flex-center">
			<div className="col-6 form-widget">
				<p className="description">S&apos;enregistrer avec un lien magique</p>
				<div>
					<input
						className="p-2 m-4 border-2 rounded focus:outline-none border-slate-300 focus:ring-2 focus:ring-bg-blue-100"
						type="email"
						placeholder="Votre adresse mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<button
						onClick={(e) => {
							e.preventDefault()
							handleLogin(email)
						}}
						className="block button buttonDefault"
						disabled={loading}
					>
						<span>{loading ? 'Chargement...' : 'Envoyer le lien magique'}</span>
					</button>
				</div>
			</div>
		</div>
	)
}
