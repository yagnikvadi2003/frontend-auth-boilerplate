/**
 * @file commitlint.config.ts
 * @description Commitlint configuration file for enforcing conventional commit messages
 *
 * @details
 * This configuration file is responsible for defining the rules and settings 
 * for commit message validation using Commitlint. It extends the conventional 
 * commit style and includes custom rules to enforce standards in commit 
 * messages. The configuration helps ensure that commit messages are structured, 
 * informative, and consistent across the project.
 *
 * Key functionalities:
 * 1. Extend @commitlint/config-conventional for standard rules.
 * 2. Set up parser and formatter presets to handle commit message parsing 
 *    and formatting.
 * 3. Define custom rules for commit message types, body casing, and length limits.
 * 4. Specify messages and prompts for user interactions during commit message 
 *    creation.
 * 5. Allow ignoring empty commit messages and provide a help URL for guidance.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-27
 * @updated 2024-09-26
 *
 * @usage
 * - Adjust the rules and prompts as necessary to fit the project's commit 
 *   message style and requirements.
 * - Ensure that referenced packages (e.g., @commitlint/config-conventional, 
 *   conventional-changelog-conventionalcommits) are installed in the project.
 *
 * @note
 * Commitlint will enforce these rules during the commit process, and any 
 * violations will result in an error, prompting the user to revise their 
 * commit message accordingly.
 *
 * @see https://github.com/conventional-changelog/commitlint for more information 
 * on configuring Commitlint and understanding commit message conventions.
 */

import { RuleConfigSeverity } from '@commitlint/types';

export default {
	/*
	 * Resolve and load @commitlint/config-conventional from node_modules.
	 * Referenced packages must be installed
	 */
	extends: ["@commitlint/config-conventional"],
	/*
	 * Resolve and load conventional-changelog-atom from node_modules.
	 * Referenced packages must be installed
	 */
	parserPreset: "conventional-changelog-conventionalcommits",
	/*
	 * Resolve and load @commitlint/format from node_modules.
	 * Referenced package must be installed
	 */
	formatter: "@commitlint/format",
	/*
	 * Any rules defined here will override rules from @commitlint/config-conventional
	 */
	rules: {
		"type-enum": [
			RuleConfigSeverity.Error,
			"always",
			[
				// Changes related to the build process or build tools.
				"build",

				// Changes that introduce functional or behavioral modifications.
				"change",

				// Miscellaneous tasks or maintenance chores that don't affect functionality.
				"chore",

				// Changes to the continuous integration (CI) configuration or scripts.
				"ci",

				// Marks code or features as deprecated and provides alternatives.
				"deprecate",

				// Documentation-related changes, updates, or additions.
				"docs",

				// Introducing a new feature or enhancement to the codebase.
				"feat",

				// Fixes for bugs or errors in the code.
				"fix",

				// Changes aimed at improving performance or optimizing code.
				"perf",

				// Modifications that enhance the code structure without changing its behavior.
				"refactor",

				// Removal of code, files, or features from the codebase.
				"remove",

				// Reverts a previous commit or changeset.
				"revert",

				// Changes addressing security vulnerabilities or improvements.
				"security",

				// Adjustments to the code style, formatting, or visual elements.
				"style",

				// Additions or updates to tests, testing frameworks, or test-related code.
				"test",

				// Initialize commit history (first commit)
				"init"
			]
		],
		"body-case": [2, "always", "sentence-case"],
		"body-max-line-length": [1, "always", Infinity],
		"header-max-length": [2, "always", 72],
		"scope-enum": [
			2,
			"always",
			[
				"html",
				"css",
				"scss",
				"markdown",
				"moduleJavascript",
				"moduleECMAScript",
				"javascript",
				"javascriptreact",
				"typescript",
				"typescriptreact",
				"json"
			]
		]
	},
	/*
	 * Functions that return true if commitlint should ignore the given message.
	 */
	ignores: [(commit: string) => commit === ""],
	/*
	 * Whether commitlint uses the default ignore rules.
	 */
	defaultIgnores: true,
	/*
	 * Custom URL to show upon failure
	 */
	helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
	/*
	 * Custom prompt configs
	 */
	prompt: {
		messages: {
			skip: ":skip",
			max: "upper %d chars",
			min: "%d chars at least",
			emptyWarning: "can not be empty",
			upperLimitWarning: "over limit",
			lowerLimitWarning: "below limit"
		},
		questions: {
			type: {
				description: "Select the type of change that you're committing:",
				enum: {
					build: {
						description:
							"Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
						title: "Builds",
						emoji: "🛠"
					},
					change: {
						description:
							"A code modification that introduces alterations to existing functionality, behavior, or implementation. Changes are made to enhance features, fix issues, or optimize performance while ensuring the continued integrity and reliability of the codebase.",
						title: "Functionality Enhancement",
						emoji: "🔄"
					},
					chore: {
						description: "Other changes that don't modify src or test files",
						title: "Chores",
						emoji: "♻️"
					},
					ci: {
						description:
							"Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
						title: "Continuous Integrations",
						emoji: "⚙️"
					},
					deprecate: {
						description:
							"A code change that marks a certain feature, method, or functionality as deprecated. This indicates that while the code is currently functional, it will be phased out in future releases, encouraging users to migrate to newer alternatives.",
						title: "Deprecation Notice",
						emoji: "⚠️"
					},
					docs: {
						description: "Documentation only changes",
						title: "Documentation",
						emoji: "📚"
					},
					feat: {
						description: "A new feature",
						title: "Features",
						emoji: "✨"
					},
					fix: {
						description: "A bug fix",
						title: "Bug Fixes",
						emoji: "🐛"
					},
					perf: {
						description: "A code change that improves performance",
						title: "Performance Improvements",
						emoji: "🚀"
					},
					refactor: {
						description: "A code change that neither fixes a bug nor adds a feature",
						title: "Code Refactoring",
						emoji: "📦"
					},
					remove: {
						description:
							"A code modification involving the removal of existing elements, such as functions, classes, or dependencies, that are no longer necessary for the current scope or functionality of the project. This helps streamline the codebase and enhance maintainability.",
						title: "Code Removal",
						emoji: "🔥"
					},
					revert: {
						description: "Reverts a previous commit",
						title: "Reverts",
						emoji: "🗑"
					},
					security: {
						description:
							"A code modification aimed at identifying, addressing, and preventing security vulnerabilities within the system. This includes implementing safeguards, encryption, and best practices to ensure the confidentiality, integrity, and availability of sensitive data and functionalities.",
						title: "Security Enhancement",
						emoji: "🛡️"
					},
					style: {
						description:
							"Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
						title: "Styles",
						emoji: "💎"
					},
					test: {
						description: "Adding missing tests or correcting existing tests",
						title: "Tests",
						emoji: "🚨"
					}
				}
			},
			scope: {
				description: "What is the scope of this change (e.g. component or file name)"
			},
			subject: {
				description: "Write a short, imperative tense description of the change"
			},
			body: {
				description: "Provide a longer description of the change"
			},
			isBreaking: {
				description: "Are there any breaking changes?"
			},
			breakingBody: {
				description:
					"A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself"
			},
			breaking: {
				description: "Describe the breaking changes"
			},
			isIssueAffected: {
				description: "Does this change affect any open issues?"
			},
			issuesBody: {
				description:
					"If issues are closed, the commit requires a body. Please enter a longer description of the commit itself"
			},
			issues: {
				description: "Add issue references (e.g. fix #123, re #123.)"
			}
		}
	}
};