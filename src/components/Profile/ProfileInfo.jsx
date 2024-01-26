import classNames from 'classnames'
import React from 'react'
import {compose} from 'redux'
import {memo} from 'react'
import {useState} from 'react'

const ProfileInfo = props => {
    let contactCount = -1
    const [aboutMeLength, setAboutMeLength] = useState(0)
    const [lookingForAJobDescriptionLength, setLookingForAJobDescriptionLength] = useState(0)

    props.watch((data) => {
        if (data.aboutMe) {
            setAboutMeLength(data.aboutMe.length)
        }
    })
    props.watch((data) => {
        if (data.lookingForAJobDescription) {
            setLookingForAJobDescriptionLength(data.lookingForAJobDescription.length)
        }
    })

    return <div className={classNames({
        'info': true,
        'noInfo': !props.profile.aboutMe && !props.profile.lookingForAJob && !props.profile.lookingForAJobDescription && !Object.values(props.profile.contacts).some(props.predicate) && !(props.authUserId === props.userId)
    })}>
        {!props.editMode && <div>
            <div className={'infoItem'}>
                <div>About me:</div>
                <span>{props.profile.aboutMe}</span>
            </div>
            {props.profile.lookingForAJob && <span className={'separator'}></span>}
            <div className={'infoItem'}>
                <div>{props.profile.lookingForAJob && 'I am looking for a job!'}</div>
            </div>
            {props.profile.lookingForAJob && <div className={'infoItem'}>
                <div>My professional skills:</div>
                <span>{props.profile.lookingForAJobDescription}</span>
            </div>}
            {Object.values(props.profile.contacts).some(props.predicate) && <span className={'separator'}></span>}
            {Object.keys(props.profile.contacts).map((k, i) => {
                contactCount += 1
                if (Object.values(props.profile.contacts)[contactCount]) {
                    return <div className={'infoItem'} key={i}>
                        <div>{`${k}: `}</div>
                        <span>
                                    <a href={`${Object.values(props.profile.contacts)[contactCount]}`}>{Object.values(props.profile.contacts)[contactCount]}</a>
                                </span>
                    </div>
                }
            })}
            {(props.userId === props.authUserId.toString()) && <div className={'infoItem'}>
                <div>{/*this div is needed due to grid requirements*/}</div>
                <div>
                    <button onClick={props.enableEditMode}>Edit</button>
                </div>
            </div>}
        </div>}
        {props.editMode && <form onSubmit={props.onSubmit}>
            <div className={'infoItem'} style={{textAlign: 'right'}}>
                <div>Name:</div>
                <input {...props.fullNameRegister}/>
            </div>
            {props.errors.fullName && <div className={'infoItem'} style={{color: 'red'}}>
                <div style={{textAlign: 'right'}}>error:</div>
                <span style={{color: 'red'}}>{props.errors.fullName.message}</span>
            </div>}
            <div className={'infoItem'} style={{textAlign: 'right'}}>
                <div>About me:</div>
                <textarea {...props.aboutMeRegister}/>
                {300 - aboutMeLength &&
                    <div className={'lengthCounter'}>{`${300 - aboutMeLength}`}</div>}
            </div>
            {props.errors.aboutMe && <div className={'infoItem'} style={{color: 'red'}}>
                <div style={{textAlign: 'right'}}>error:</div>
                <span style={{color: 'red'}}>{props.errors.aboutMe.message}</span>
            </div>}
            <span className={'separator'}></span>
            <div className={'infoItem'} style={{textAlign: 'right'}}>
                <div>Looking for a job?</div>
                <input type={'checkbox'} {...props.lookingForAJobRegister}/>
            </div>
            <div className={'infoItem'} style={{textAlign: 'right'}}>
                <div>My professional skills:</div>
                <textarea {...props.lookingForAJobDescriptionRegister}/>
                {300 - lookingForAJobDescriptionLength &&
                    <div className={'lengthCounter'}>{`${300 - lookingForAJobDescriptionLength}`}</div>}
            </div>
            {props.errors.lookingForAJobDescription && <div className={'infoItem'} style={{color: 'red'}}>
                <div style={{textAlign: 'right'}}>error:</div>
                <span style={{color: 'red'}}>{props.errors.lookingForAJobDescription.message}</span>
            </div>}
            <span className={'separator'}></span>
            {Object.keys(props.profile.contacts).map(props.createContactInput)}
            <div className={'infoItem'}>
                <div></div>
                <div>
                    <button>Submit</button>
                </div>
            </div>
        </form>}
    </div>
}

export default compose(memo)(ProfileInfo)