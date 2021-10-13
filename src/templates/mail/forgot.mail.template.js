module.exports = token => `
<table class="inner-body"
			 align="center"
			 width="570"
			 cellpadding="0"
			 cellspacing="0"
			 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; background-color: #FFFFFF; margin: 0 auto; padding: 0; width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 570px;">
	<tbody>
	<tr>
		<td class="content-cell"
				style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; padding: 35px;">
			<h1 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #2F3133; font-size: 19px; font-weight: bold; margin-top: 0; text-align: left;">
					Hello!
			</h1>
			<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">
					You are receiving this email because we received a password reset request for your account.
			</p>
			<table class="action"
						 align="center"
						 width="100%"
						 cellpadding="0"
						 cellspacing="0"
						 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; margin: 30px auto; padding: 0; text-align: center; width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%;">
				<tbody>
				<tr>
					<td align="center"
							style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
						<table width="100%"
									 border="0"
									 cellpadding="0"
									 cellspacing="0"
									 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
							<tbody>
							<tr>
								<td align="center"
										style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
									<table border="0"
												 cellpadding="0"
												 cellspacing="0"
												 style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
										<tbody>
										<tr>
											<td style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box;">
											<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">
													Use this token to reset your password:
											</p>
												${token}
											</td>
										</tr>
										</tbody>
									</table>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
			<p style="font-family: Avenir, Helvetica, sans-serif; box-sizing: border-box; color: #74787E; font-size: 16px; line-height: 1.5em; margin-top: 0; text-align: left;">
					If you did not request a password reset, no further action is required.
			</p>
		</td>
	</tr>
	</tbody>
</table>
`;
