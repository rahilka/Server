// Survey New shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	// shortcut from create-react-app to setup initial state
	state = { showFormReview: false };

	renderContent() {
		if(this.state.showFormReview) {
			return <SurveyFormReview />;
		}

		return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default SurveyNew;