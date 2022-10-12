import { Link } from 'gatsby'
import React, { useState } from 'react'
import Icon from './icon'
import IconText from './icon-text'
import Subtitle from './subtitle'
import styles from './footer.module.css'
import Body from './body'
import Picture from './picture'
const axios = require('axios');


const Footer = ({ data }) => {
    const [userEmail, setUserEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const emailIcon = <Icon symbol={'email'} fill={'white'} />
    const phoneIcon = <Icon symbol={'phone'} fill={'white'} />
    const emailText = <Body text={data.email} color={'white'} />
    const phoneText = <Body text={data.phone} color={'white'} />

    const handleChange = (event) => {
        setUserEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        axios({
            method: 'post',
            url: '/.netlify/functions/add-to-mailing-list',
            data: {
                email: userEmail
            }
        }).then(res => {
            setSubmitted(true)
        }).catch(err => {
            alert('Sorry, there was a problem adding your email address. Please try again.')
        })

        event.preventDefault()
    }

    return (
        <div className={styles.root}>
            <div className={styles.mainWrapper}>
                <div className={styles.colWrapper}>
                    <div className={styles.col1}>
                        <Link className={styles.logo} to='/'>
                            <Picture fluid={data.logo.asset.fluid} objectFit={'contain'} sizes={'50vw'} />
                        </Link>
                        <br />
                        <div className={styles.body}>
                            {data.body}
                        </div>
                    </div>

                    <div className={styles.col2}>
                        <Subtitle color={'white'} text={data.headerOne} />
                        <br />
                        <IconText icon={emailIcon} text={data.email} />
                        <IconText icon={phoneIcon} text={data.phone} />
                    </div>
                    <div className={styles.col3}>
                        <Subtitle color={'white'} text={data.headerTwo} />
                        <br />
                        <div className={styles.form}>
                            <div style={{ margin: '15px 0 15px 0', whiteSpace: 'nowrap' }}>{data.formDesc}</div>
                            <br />
                            {!submitted && <form onSubmit={handleSubmit}>
                                <label>
                                    <span style={{ paddingRight: '20px' }}>Email:</span>
                                    <input style={{ marginRight: '20px' }} type="text" value={userEmail} onChange={handleChange} disabled={submitted} />
                                </label>
                                <input className={styles.submit} type="submit" value="Submit" disabled={submitted} />

                            </form>}
                            {submitted && <span className={styles.successMessage}>You're Subscribed!</span>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
