import React from 'react';
import './AdvancedSearch.css';

export default class AdvancedSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_val: '',
            date_val: '',
            digital_sign_val: '',
            doc_new_id_val: '',
            first_page_val: '',
            footer_val: '',
            filename: '',
            showFirstBtn: true,
            firstInput: '',
            first: '',
            showSecond: false,
            showSecondBtn: true,
            secondInput: '',
            second: '',
            showThird: false,
            showThirdBtn: true,
            thirdInput: '',
            third: '',
            showFourth: false,
            showFourthBtn: true,
            fourthnput: '',
            fourth: '',
            showFifth: false,
            showFifthBtn: true,
            fifthInput: '',
            fifth: '',
            showSixth: false,
            showSixthBtn: true,
            sixthInput: '',
            sixth: '',
            showSeventh: false,
            showSeventhBtn: true,
            seventhInput: '',
            seventh: '',
            docs_keys_first: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_second: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_third: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_fourth: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_fifth: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_sixth: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_seventh: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
            docs_keys_all: ['account_val', 'date_val', 'digital_sign_val',
                'doc_new_id_val', 'first_page_val', 'footer_val', 'filename'],
        }
    }

    updateOptions = () => {
        let update_docs_keys_first = this.state.docs_keys_all.slice();
        const firstArr = [this.state.second, this.state.third, this.state.fourth, this.state.fifth, this.state.sixth, this.state.seventh]
        update_docs_keys_first = update_docs_keys_first.filter(option => !firstArr.includes(option));
        this.setState({
            docs_keys_first: [...update_docs_keys_first],
        });
        if (this.state.showSecond == true) {
            let update_docs_keys_second = this.state.docs_keys_all.slice();
            const secondArr = [this.state.first, this.state.third, this.state.fourth, this.state.fifth, this.state.sixth, this.state.seventh]
            update_docs_keys_second = update_docs_keys_second.filter(option => !secondArr.includes(option));
            this.setState({
                docs_keys_second: [...update_docs_keys_second],
            });
        }
        if (this.state.showThird == true) {
            let update_docs_keys_third = this.state.docs_keys_all.slice();
            const thirdArr = [this.state.first, this.state.second, this.state.fourth, this.state.fifth, this.state.sixth, this.state.seventh]
            update_docs_keys_third = update_docs_keys_third.filter(option => !thirdArr.includes(option));
            this.setState({
                docs_keys_third: [...update_docs_keys_third],
            });
        }
        if (this.state.showFourth == true) {
            let update_docs_keys_fourth = this.state.docs_keys_all.slice();
            const fourthArr = [this.state.first, this.state.second, this.state.third, this.state.fifth, this.state.sixth, this.state.seventh]
            update_docs_keys_fourth = update_docs_keys_fourth.filter(option => !fourthArr.includes(option));
            this.setState({
                docs_keys_fourth: [...update_docs_keys_fourth],
            });
        }
        if (this.state.showFifth == true) {
            let update_docs_keys_fifth = this.state.docs_keys_all.slice();
            const fifthArr = [this.state.first, this.state.second, this.state.third, this.state.fourth, this.state.sixth, this.state.seventh]
            update_docs_keys_fifth = update_docs_keys_fifth.filter(option => !fifthArr.includes(option));
            this.setState({
                docs_keys_fifth: [...update_docs_keys_fifth],
            });
        }
        if (this.state.showSixth == true) {
            let update_docs_keys_sixth = this.state.docs_keys_all.slice();
            const sixthArr = [this.state.first, this.state.second, this.state.third, this.state.fourth, this.state.fifth, this.state.seventh]
            update_docs_keys_sixth = update_docs_keys_sixth.filter(option => !sixthArr.includes(option));
            this.setState({
                docs_keys_sixth: [...update_docs_keys_sixth],
            });
        }
        if (this.state.showSeventh == true) {
            let update_docs_keys_seventh = this.state.docs_keys_all.slice();
            const seventhArr = [this.state.first, this.state.second, this.state.third, this.state.fourth, this.state.fifth, this.state.sixth]
            update_docs_keys_seventh = update_docs_keys_seventh.filter(option => !seventhArr.includes(option));
            this.setState({
                docs_keys_seventh: [...update_docs_keys_seventh],
            });
        }
    }

    handleChangeFirstSelected = (event) => {
        this.setState({
            first: event.target.value,
            firstInput: "",
            [this.state.first]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeFirstInput = (event) => {
        this.setState({
            firstInput: event.target.value,
            [this.state.first]: event.target.value,
        });
    }

    secondSearch = event => {
        event.preventDefault();
        this.setState({
            showSecond: true,
            showSecondBtn: true,
            showFirstBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeSecondSelected = (event) => {
        this.setState({
            second: event.target.value,
            secondInput: "",
            [this.state.second]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeSecondInput = (event) => {
        this.setState({
            secondInput: event.target.value,
            [this.state.second]: event.target.value
        });
    }

    secondSearchHide = () => {
        this.setState({
            second: "",
            secondInput: "",
            [this.state.second]: "",
            showSecond: false,
            showSecondBtn: false,
            showFirst: true,
            showFirstBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    thirdSearch = event => {
        event.preventDefault();
        this.setState({
            showThird: true,
            showThirdBtn: true,
            showSecondBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeThirdSelected = (event) => {
        this.setState({
            third: event.target.value,
            thirdInput: "",
            [this.state.third]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeThirdInput = (event) => {
        this.setState({
            thirdInput: event.target.value,
            [this.state.third]: event.target.value
        });
    }

    thirdSearchHide = () => {
        this.setState({
            third: "",
            thirdInput: "",
            [this.state.third]: "",
            showThird: false,
            showThirdBtn: false,
            showSecond: true,
            showSecondBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    fourthSearch = event => {
        event.preventDefault();
        this.setState({
            showFourth: true,
            showFourthBtn: true,
            showThirdBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeFourthSelected = (event) => {
        this.setState({
            fourth: event.target.value,
            fourthInput: "",
            [this.state.fourth]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeFourthInput = (event) => {
        this.setState({
            fourthInput: event.target.value,
            [this.state.fourth]: event.target.value
        });
    }

    fourthSearchHide = () => {
        this.setState({
            fourth: "",
            fourthInput: "",
            [this.state.fourth]: "",
            showFourth: false,
            showFourthBtn: false,
            showThird: true,
            showThirdBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    fifthSearch = event => {
        event.preventDefault();
        this.setState({
            showFifth: true,
            showFifthBtn: true,
            showFourthBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeFifthSelected = (event) => {
        this.setState({
            fifth: event.target.value,
            fifthInput: "",
            [this.state.fifth]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeFifthInput = (event) => {
        this.setState({
            fifthInput: event.target.value,
            [this.state.fifth]: event.target.value
        });
    }

    fifthSearchHide = () => {
        this.setState({
            fifth: "",
            fifthInput: "",
            [this.state.fifth]: "",
            showFifth: false,
            showFifthBtn: false,
            showFourth: true,
            showFourthBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    sixthSearch = event => {
        event.preventDefault();
        this.setState({
            showSixth: true,
            showSixthBtn: true,
            showFifthBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeSixthSelected = (event) => {
        this.setState({
            sixth: event.target.value,
            soxthInput: "",
            [this.state.sixth]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeSixthInput = (event) => {
        this.setState({
            sixthInput: event.target.value,
            [this.state.sixth]: event.target.value
        });
    }

    sixthSearchHide = () => {
        this.setState({
            sixth: "",
            sixthInput: "",
            [this.state.sixth]: "",
            showSixth: false,
            showSixthBtn: false,
            showFifth: true,
            showFifthBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    seventhSearch = event => {
        event.preventDefault();
        this.setState({
            showSeventh: true,
            showSeventhBtn: true,
            showSixthBtn: false,
        }, () => {
            this.updateOptions();
        })
    }

    handleChangeSeventhSelected = (event) => {
        this.setState({
            seventh: event.target.value,
            seventhInput: "",
            [this.state.seventh]: "",
        }, () => {
            this.updateOptions();
        })
    };

    handleChangeSeventhInput = (event) => {
        this.setState({
            seventhInput: event.target.value,
            [this.state.seventh]: event.target.value
        });
    }

    seventhSearchHide = () => {
        this.setState({
            seventh: "",
            seventhInput: "",
            [this.state.seventh]: "",
            showSeventh: false,
            showSeventhBtn: false,
            showSixth: true,
            showSixthBtn: true,
        }, () => {
            this.updateOptions();
        })
    }

    advancedSearchHandler = (event) => {
        event.preventDefault();
        const advancedSearch = { "account_val": this.state.account_val, "date_val": this.state.date_val, "digital_sign_val": this.state.digital_sign_val, "doc_new_id_val": this.state.doc_new_id_val, "first_page_val": this.state.first_page_val, "footer_val": this.state.footer_val, "filename": this.state.filename };
        this.props.submitSearch(advancedSearch);
    };

    render() {
        const { showFirstBtn, showSecond, showSecondBtn, showThird, showThirdBtn, showFourth, showFourthBtn, showFifth, showFifthBtn, showSixth, showSixthBtn, showSeventh, showSeventhBtn } = this.state;
        return (
            <div className="advancedWidth">
                <div className="bottomSpace floatLeft">
                    <select className="advancedSelect advancedFont" value={this.state.first} onChange={this.handleChangeFirstSelected}>
                        <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_first.map((vals, i) =>
                            <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                    </select>
                    <input type="text" className="fieldSearchBx" name={this.state.first} value={this.state.firstInput} onChange={this.handleChangeFirstInput} />
                    {showFirstBtn &&
                        <button className="onlyAddRemove advancedFont" onClick={this.secondSearch}>+</button>
                    }
                </div>
                <div className="bottomSpace floatLeft">
                    {showSecond && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.second} onChange={this.handleChangeSecondSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_second.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.second} value={this.state.secondInput} onChange={this.handleChangeSecondInput} />
                        </span>
                    )}
                    {showSecond && showSecondBtn && (
                        <span>
                            <button className="addRemove advancedFont" onClick={this.secondSearchHide}>-</button>
                            <button className="addRemove advancedFont" onClick={this.thirdSearch}>+</button>
                        </span>
                    )}
                </div>
                <div className="bottomSpace floatLeft">
                    {showThird && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.third} onChange={this.handleChangeThirdSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_third.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.third} value={this.state.thirdInput} onChange={this.handleChangeThirdInput} />                </span>
                    )}
                    {showThird && showThirdBtn && (
                        <span>
                            <button className="addRemove advancedFont" onClick={this.thirdSearchHide}>-</button>
                            <button className="addRemove advancedFont" onClick={this.fourthSearch}>+</button>
                        </span>
                    )}
                </div>
                <div className="bottomSpace floatLeft">
                    {showFourth && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.fourth} onChange={this.handleChangeFourthSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_fourth.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.fourth} value={this.state.fourthInput} onChange={this.handleChangeFourthInput} />                </span>
                    )}
                    {showFourth && showFourthBtn && (
                        <span>
                            <button className="addRemove advancedFont" onClick={this.fourthSearchHide}>-</button>
                            <button className="addRemove advancedFont" onClick={this.fifthSearch}>+</button>
                        </span>
                    )}
                </div>
                <div className="bottomSpace floatLeft">
                    {showFifth && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.fifth} onChange={this.handleChangeFifthSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_fifth.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.fifth} value={this.state.fifthInput} onChange={this.handleChangeFifthInput} />                </span>
                    )}
                    {showFifth && showFifthBtn && (
                        <span>
                            <button className="addRemove advancedFont" onClick={this.fifthSearchHide}>-</button>
                            <button className="addRemove advancedFont" onClick={this.sixthSearch}>+</button>
                        </span>
                    )}
                </div>
                <div className="bottomSpace floatLeft">
                    {showSixth && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.sixth} onChange={this.handleChangeSixthSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_sixth.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.sixth} value={this.state.sixthInput} onChange={this.handleChangeSixthInput} />                </span>
                    )}
                    {showSixth && showSixthBtn && (
                        <span>
                            <button className="addRemove advancedFont" onClick={this.sixthSearchHide}>-</button>
                            <button className="addRemove advancedFont" onClick={this.seventhSearch}>+</button>
                        </span>
                    )}
                </div>
                <div className="floatLeft">
                    {showSeventh && (
                        <span>
                            <select className="advancedSelect advancedFont" value={this.state.seventh} onChange={this.handleChangeSeventhSelected}>
                                <option value="" disabled selected hidden>Select field</option>{this.state.docs_keys_seventh.map((vals, i) =>
                                    <option key={i} name={vals} value={vals}>{vals.replace(/_/g, " ")}</option>)}
                            </select>
                            <input type="text" className="fieldSearchBx" name={this.state.seventh} value={this.state.seventhInput} onChange={this.handleChangeSeventhInput} />                </span>
                    )}
                    {showSeventh && showSeventhBtn &&
                        <button className="onlyAddRemove advancedFont" onClick={this.seventhSearchHide}>-</button>
                    }
                </div>
                <button className="advancedSubmit advancedFont" onClick={this.advancedSearchHandler}>Submit</button>
            </div>
        )
    }
}