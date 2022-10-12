import React from 'react'
import styles from './two-columns-text.module.css'

const TwoColumnsText = (props) => {
    const { data, errors } = props

    if (errors) {
        return (
            <Layout>
                <GraphQLErrorList errors={errors} />
            </Layout>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {data.title}
            </div>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.body}>
                        {data.subsections[0].body}
                    </div>

                </div>
                <div className={styles.right}>
                    <div className={styles.body}>
                        {data.subsections[1].body}
                    </div>
                </div>
            </div>
            <hr className={styles.line} />

        </div>
    )
}

export default TwoColumnsText