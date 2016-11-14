(function () {
	'use strict';

	// Routes and Config should be in seperate files.

	var configuration = function ($compileProvider, $stateProvider, $urlRouterProvider, storeProvider) {

		$compileProvider.debugInfoEnabled(false);
		storeProvider.setStore('sessionStorage');
		$urlRouterProvider.otherwise('/login');
		$stateProvider.state('login', {
			url: '/login?e',
			templateUrl: 'app/login/login.html',
			controller: 'LoginController as vm',
			class: 'login'
		})

		.state('reminder', {
			url: '^/reminder',
			templateUrl: 'app/reminder/reminder.html',
			controller: 'ReminderController as vm',
			class: 'reminder'

		})

		.state('express', {
			url: '^/express',
			header: {
				title: 'Compare or Express',
				blurb: 'The decisions you make now about your pension, medical aid and insurance cover will affect you and your loved ones in the future.'
			},
			templateUrl: 'app/express/express.html',
			controller: 'ExpressController as vm'
		})

		.state('shell', {
			url: '/shell',
			views: {
				'': {
					templateUrl: 'app/shell/shell.html'
				}
			}
		})

		.state('shell.overview', {
			url: '^/overview',
			header: {
				title: 'Overview',
				heading: 'Retirement savings and benefits',
				blurb: 'We\'ll need 15 minutes of your time to take you through your options. <br />The decisions you make here will impact your future.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/overview/overview.html',
					controller: 'OverviewController as vm'
				}
			}

		})

		.state('shell.choices', {
			url: '^/choices',
			header: {
				title: 'Your choices',
				blurb: 'You have chosen to keep your benefit and your retirement savings invested and growing.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/your-choices.html',
					controller: 'YourChoicesController as vm'
				}
			}
		})

		.state('shell.details', {
			url: '^/details',
			header: {
				title: 'Confirm your details',
				heading: 'Confirm your details',
				blurb: 'Please confirm your details so that we can send you your final confirmation.',
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/your-details.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		// QUESTION STATES

		.state('shell.before', {
			url: '^/before',
			header: {
				title: 'Before you start',
				blurb: 'Please select one of the options below. This tells us more about your current situation so we can give you all the right information.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/questions/before.html',
					controller: 'QuestionsController as vm'
				}
			}
		})

		.state('shell.questions', {
			url: '^/questions',
			header: {
				title: 'Questions',
				heading: 'Tell us about yourself',
				blurb: 'Just two or three quick questions to help us understand your current situation.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/questions/questions.html',
					controller: 'QuestionsController as vm'
				}
			}
		})

		.state('shell.benefits', {
			url: '^/benefits',
			header: {
				title: 'Benefits Summary',
				heading: 'Your benefit summary',
				blurb: 'Make important decisions on what to do with your benefits now that you are leaving <companyname></companyname>.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/benefits/benefits.html',
					controller: 'BenefitsController as vm'
				}
			}
		})

		.state('shell.retirement', {
			url: '^/retirement',
			header: {
				title: 'Retirement',
				heading: 'What would you like to do?',
				blurb: 'These are the savings you have accumulated from your retirement fund contributions and investment returns.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/benefits/retirement-new.html',
					controller: 'BenefitsController as vm'
				}
			}
		})

		// SAVE STATES

		.state('shell.preserving', {
			url: '^/preserving',
			header: {
				title: 'Saving',
				heading: 'Saving your retirement',
				blurb: 'You have chosen to keep your retirement savings growing. This will help you to have the lifestyle you want when you retire.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/preserving.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		.state('shell.keeping', {
			url: '^/keeping',
			header: {
				title: 'Keeping',
				heading: 'Saving your retirement',
				blurb: 'Please select the Momentum saving option you would like to have.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/preserving-keep.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		.state('shell.corporate-confirm', {
			url: '^/confirm',
			header: {
				title: 'Keeping',
				heading: 'Saving your retirement',
				blurb: 'Well done! You\'ve chosen to keep part or all of your retirement savings invested.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/thank-you.html',
					controller: 'ConfirmController as vm'
				}
			}
		})


		// CASHOUT STATES

		.state('cashout-confirm', {
			url: '^/cashout-confirm',
			header: {
				title: 'Confirm',
				heading: 'Are you sure?',
				blurb: "You have chosen to take R{{vm.calc.model.totalCashout | number : 2}} as a lump sum."
			},
			views: {
				'': {
					templateUrl: 'app/checkout/cashout-confirm-popup.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		.state('shell.cashout-bank-details', {
			url: '^/cashout-bank',
			title: 'Cashout Bank Details',
			heading: 'Taking a lump sum from your retirement savings',
			blurb: 'You have confirmed that you understand the impact of taking part of or all of your retirement savings in as a lump sum and you want to go ahead.',
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/cashout-bank-details.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		// HELP ME STATES

		.state('shell.faq', {
			url: '^/faq',
			header: {
				title: 'FAQ',
				heading: 'FAQ',
				blurb: 'Answers to your most common questions'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/help/faq.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		.state('shell.get-more-help', {
			url: '^/get-more-help',
			header: {
				title: 'Help',
				heading: 'Get more help',
				blurb: 'Please choose one of the following options to get the information you need.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/help/get-more-help.html',
					controller: 'HelpController as vm'
				}
			}
		})

		.state('shell.help-adviser', {
			url: '^/help-adviser',
			header: {
				title: 'Help',
				heading: 'Get more help',
				blurb: 'Please choose one of the following options to get the information you need.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/help/help-adviser.html',
					controller: 'HelpController as vm'
				}
			}
		})

		.state('shell.help-info', {
			url: '^/help-info',
			header: {
				title: 'Help',
				heading: 'Get more help',
				blurb: 'Please choose one of the following options to get the information you need.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/help/help-info.html',
					controller: 'HelpController as vm'
				}
			}
		})


		// TRANSFER THANK YOU STATE
		.state('shell.transfer-thank-you', {
			url: '^/transfer',
			header: {
				title: 'Transfer',
				heading: 'Saving with another',
				blurb: 'You have chosen to transfer your retirement savings to another retirement fund from a different provider.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/thank-you.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		// ADVISER THANK YOU STATE
		.state('shell.adviser-thank-you', {
			url: '^/contact-you',
			header: {
				title: 'Contact You',
				heading: '',
				blurb: ''
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/thank-you.html',
					controller: 'HelpController as vm'
				}
			}
		})

		// END THANK YOU STATE
		.state('shell.thank-you', {
			url: '^/thank-you',
			header: {
				title: 'Thank You',
				blurb: 'For taking the time and completing the process.'
			},
			views: {
				'content@shell': {
					templateUrl: 'app/checkout/thank-you.html',
					controller: 'ConfirmController as vm'
				}
			}
		})

		.state('logout', {
			url: '^/logout',
			header: {
				title: 'You have logged out'
			},
			views: {
				'': {
					templateUrl: 'app/login/logout.html',
					controller: 'LogoutController as vm'
				}
			}
		})

		.state('error', {
			url: '^/error',
			header: {
				title: 'Error',
				heading: 'Sorry about that',
				blurb: ''
			},
			views: {
				'': {
					templateUrl: 'app/error/error.html'
				}
			}
		})

		.state('expire', {
			url: '^/expire',
			header: {
				title: 'Expired',
				heading: 'The action is no longer valid',
				blurb: ''
			},
			views: {
				'': {
					templateUrl: 'app/error/expire.html'
				}
			}
		});
	};
	angular.module('WLS', ['ui.bootstrap', 'ngResource', 'moment-picker', 'ngMessages', 'ui.router', 'angular-storage', 'rzModule'])
		.config(['$stateProvider', '$urlRouterProvider', 'storeProvider', configuration])

})();