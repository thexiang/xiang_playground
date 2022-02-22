import React from "react";

import miyaPhoto from 'assets/miya.JPG';

export const AboutPage = () => (
	<div>
		<h3 className="title is-1">About</h3>
		<hr />
		<br />
		<p className="content">
			Add something relevant here.
		</p>

		<img src={miyaPhoto} width="600px" />
	</div>
);
