import classNames from 'classnames'
import React from 'react'
import {compose} from 'redux'
import {memo} from 'react'

const ProfileInfo = props => {
    let contactCount = -1
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
            <div className={'infoItem'}>
                <div>Name:</div>
                <input {...props.fullNameRegister}/>
            </div>
            {props.errors.fullName && <div className={'infoItem'} style={{color: 'red'}}>
                <div>error:</div>
                <span style={{color: 'red'}}>{props.errors.fullName.message}</span>
            </div>}
            <div className={'infoItem'}>
                <div>About me:</div>
                <textarea {...props.aboutMeRegister}/>
                {300 - props.aboutMeLength &&
                    <div className={'lengthCounter'}>{`${300 - props.aboutMeLength}`}</div>}
            </div>
            {props.errors.aboutMe && <div className={'infoItem'} style={{color: 'red'}}>
                <div>error:</div>
                <span style={{color: 'red'}}>{props.errors.aboutMe.message}</span>
            </div>}
            <span className={'separator'}></span>
            <div className={'infoItem'}>
                <div>Looking for a job?</div>
                <input type={'checkbox'} {...props.lookingForAJobRegister}/>
            </div>
            <div className={'infoItem'}>
                <div>My professional skills:</div>
                <textarea {...props.lookingForAJobDescriptionRegister}/>
                {300 - props.lookingForAJobDescriptionLength &&
                    <div className={'lengthCounter'}>{`${300 - props.lookingForAJobDescriptionLength}`}</div>}
            </div>
            <span className={'separator'}></span>
            {Object.keys(props.profile.contacts).map(props.callbackfn1)}
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