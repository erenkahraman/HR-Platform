import { useState } from 'react'
import styles from '../../styles/Home.module.css'
import cookie from "js-cookie";

export default function NewEmail() {
	const user = cookie?.get("user");
    const [inputs, setInputs] = useState(
    	{ 

			emailFrom: '',
			emailTo: '',
			subject:'',
			message: ''
		}
    	);

	const [form, setForm] = useState('')

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}))

	}

	const onSubmitForm = async (e) => {
		e.preventDefault()

		if ( inputs.emailTo && inputs.subject && inputs.message ) {
			setForm({ state: 'loading' })
			
			try {
				inputs.emailFrom = user.email;
				
				const res = await fetch(`../api/contact`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(inputs),
				})

				const { error } = await res.json()

				if (error) {
					setForm({
						state: 'error',
						message: error,
					})
					return
				}

				setForm({
					state: 'success',
					message: 'Your message was sent successfully.',
				})

				
			} catch (error) {
				setForm({
					state: 'error',
					message: 'Something went wrong',
				})
			}
		}
	}

	return (
		<div className={styles.container} >
			<form className={styles.form} onSubmit={(e) => onSubmitForm(e)}>
				
				<div>To : <input
					id='emailTo'
					type='email'
					style={{width:"93%"}}
					value={inputs.emailTo}
					onChange={handleChange}
					className={styles.inputField}
					placeholder=''
					required
				/></div>
				<div>Subject : <input
					id='subject'
					type='input'
					style={{width:"85%"}}
					value={inputs.subject}
					onChange={handleChange}
					className={styles.inputField}
					placeholder=''
					required
				/></div>
				<textarea
					id='message'
					type='text'
					value={inputs.message}
					onChange={handleChange}
					className={styles.inputField}
					placeholder='Message'
					rows='5'
					required
				/>
				<input type='submit' value="Submit"  className={styles.button} />
				{form.state === 'loading' ? (
					<div>Sending....</div>
				) : form.state === 'error' ? (
					<div>{form.message}</div>
				) : (
					form.state === 'success' && <div>Sent successfully</div>
				)}
			</form>
		</div>
	)
}