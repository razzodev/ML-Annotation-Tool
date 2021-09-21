import React from 'react';
import { getForm } from '../../lib/api.js';
import './DetectForm.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class DetectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            loading: false
        };
    }
    // componentDidMount() {
    //     this.fetchForm().then();
    // }
    // async fetchForm() {
    //     this.setState({ loading: true });
    //     const response = await getForm();
    //     const form = response.data;
    //     this.setState({ form, loading: false });
    // }
    render() {
        const { form, loading } = this.state;
        return (
            <div className="detectBack">
                <div className="detectFormHeader">Detect Form</div>
                <div className="detectFormBody">
                    <div className="detectFormLeft">
                        <div className="pages">
                            <div className="pageBottom">1</div></div>
                        {/* <div className="pages">
                            <div className="pageBottom">2</div>
                            </div>
                        <div className="pages">
                            <div className="pageBottom">3</div>
                            </div> */}
                    </div>
                        <div className="upload">
                            <div><FontAwesomeIcon className="plus" icon={faPlus} /></div>
                            <div className="uploadText">Upload form</div>
                        </div>
                    <div className="detectFormRight">
                    <div className="detectFormRightTop">
                        <div className="docData">
                            <div className="docInfo">Document Information</div>
                            <label className="docTitle">Title</label>
                            <textarea className="titleBox" name="title" placeholder="Enter the title" />
                            <label className="docNumPg">Number of pages
                                <input className="numPgBox" type="text" name="pageNum" placeholder="0" />
                            </label>
                        </div>
                    </div>
                    <div className="formRightBottom">
                            <button className="detectAnother" disabled>Detect another form</button>
                            <button className="detectCancel" disabled>Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
            /*  {loading && <h5>Loading... </h5>}
                {!loading && form && (
                    <div >HERE</div>
                )} */
        );
    }
}