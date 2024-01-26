import React, {memo} from 'react'
import {compose} from 'redux'

const News = () => {
    return <div>
        News
        <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', marginTop: '90px'}}>This section is under development</div>
    </div>
}

export default compose(memo)(News)