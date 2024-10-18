// !Global Window Extensions
/**
 * Extend the global `Window` interface to include custom properties or methods.
 * This allows TypeScript to recognize and type-check global properties or functions that
 * are added to the `window` object, which may be introduced by external scripts or libraries.
 *
 * * Example Usage:
 * window.startLegacyApp(); // TypeScript recognizes that `startLegacyApp` is a function on `window`
 */

/**
 * Declare a global interface extension for the `Window` object.
 * This declaration adds a new property `startLegacyApp` of type `Function` to the `window` object.
 * It allows access to `window.startLegacyApp` in TypeScript with proper type checking and IntelliSense support.
 *
 * * Example Usage:
 * // Accessing the `startLegacyApp` function from the global `window` object
 * window.startLegacyApp(); // TypeScript understands that this is a function
 */
declare global {
	interface Window {
		startLegacyApp: Function;
		readonly NODE_ENV: "development" | "production" | "staging";
		readonly PUBLIC_URL: string;
	}
}

// !CSS modules
/**
 * Represents a mapping of CSS module class names to unique identifiers (strings).
 * The keys are class names, and the values are unique identifier strings.
 */
type CSSModuleClasses = { readonly [key: string]: string };

/**
 * Declare a module for .module.css files.
 * This module declaration allows importing CSS module classes as an object mapping class names to unique identifiers.
 *
 * * Usage example:
 * import styles from './path/to/my-styles.module.css';
 * const className = styles.myClass; // className will be a unique identifier for the CSS class
 */
declare module "*.module.css" {
	const classes: CSSModuleClasses; // An object mapping class names to unique identifiers
	export default classes; // Export the classes object for import usage
}

/**
 * Declare a module for .module.scss files.
 * This module declaration allows importing SCSS module classes as an object mapping class names to unique identifiers.
 *
 * * Usage example:
 * import styles from './path/to/my-styles.module.scss';
 * const className = styles.myClass; // className will be a unique identifier for the SCSS class
 */
declare module "*.module.scss" {
	const classes: CSSModuleClasses; // An object mapping class names to unique identifiers
	export default classes; // Export the classes object for import usage
}

/**
 * Declare a module for .module.less files.
 * This module declaration allows importing LESS module classes as an object mapping class names to unique identifiers.
 *
 * * Usage example:
 * import styles from './path/to/my-styles.module.less';
 * const className = styles.myClass; // className will be a unique identifier for the LESS class
 */
declare module "*.module.less" {
	const classes: CSSModuleClasses; // An object mapping class names to unique identifiers
	export default classes; // Export the classes object for import usage
}

// !CSS
/**
 * Declare a module for .css files.
 * This module declaration allows importing CSS files as strings representing the file contents.
 *
 * @deprecated Use `import style from './style.css?inline'` instead.
 * * Usage example:
 * import myStyle from './path/to/my-style.css?inline';
 */
declare module "*.css" {
	const css: string; // The import will be a string representing the file contents
	export default css; // Export the value for import usage
}

/**
 * Declare a module for .webp files.
 * This module declaration allows importing .webp files as strings representing file paths.
 *
 * * Usage example:
 * import myWebp from './path/to/my-image.webp';
 */
declare module "*.webp" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .scss files.
 * This module declaration allows importing SCSS files as strings representing the file contents.
 *
 * @deprecated Use `import style from './style.scss?inline'` instead.
 * * Usage example:
 * import myStyle from './path/to/my-style.scss?inline';
 */
declare module "*.scss" {
	const css: string; // The import will be a string representing the file contents
	export default css; // Export the value for import usage
}

/**
 * Declare a module for .sass files.
 * This module declaration allows importing SASS files as strings representing the file contents.
 *
 * @deprecated Use `import style from './style.sass?inline'` instead.
 * * Usage example:
 * import myStyle from './path/to/my-style.sass?inline';
 */
declare module "*.sass" {
	const css: string; // The import will be a string representing the file contents
	export default css; // Export the value for import usage
}

/**
 * Declare a module for .less files.
 * This module declaration allows importing LESS files as strings representing the file contents.
 *
 * @deprecated Use `import style from './style.less?inline'` instead.
 * * Usage example:
 * import myStyle from './path/to/my-style.less?inline';
 */
declare module "*.less" {
	const css: string; // The import will be a string representing the file contents
	export default css; // Export the value for import usage
}

// !images
/**
 * Declare a module for .png files.
 * This module declaration allows importing .png files as strings representing file paths.
 *
 * * Usage example:
 * import myPng from './path/to/my.png';
 */
declare module "*.png" {
	const value: string; // The import will be a string representing the file path
	export default value; // Export the value for import usage
}

/**
 * Declare a module for .svg files.
 * This module declaration allows importing .svg files as strings representing file paths.
 *
 * * Usage example:
 * import mySvg from './path/to/my.svg';
 * <MySvg /> // You can use it as a React component
 */
declare module "*.svg" {
	import * as React from "react";
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

/**
 * Declare a module for .jpeg files.
 * This module declaration allows importing .jpeg files as strings representing file paths.
 *
 * * Usage example:
 * import myJpeg from './path/to/my.jpeg';
 */
declare module "*.jpeg" {
	const value: string; // The import will be a string representing the file path
	export default value; // Export the value for import usage
}

/**
 * Declare a module for .jpg files.
 * This module declaration allows importing .jpg files as strings representing file paths.
 *
 * * Usage example:
 * import myJpg from './path/to/my.jpg';
 */
declare module "*.jpg" {
	const value: string; // The import will be a string representing the file path
	export default value; // Export the value for import usage
}

/**
 * Declare a module for .gif files.
 * This module declaration allows importing .gif files as strings representing file paths.
 *
 * * Usage example:
 * import myGif from './path/to/my.gif';
 */
declare module "*.gif" {
	const value: string; // The import will be a string representing the file path
	export default value; // Export the value for import usage
}

/**
 * Declare a module for .ico files.
 * This module declaration allows importing .ico files as strings representing file paths.
 *
 * * Usage example:
 * import myIco from './path/to/my.ico';
 */
declare module "*.ico" {
	const value: string; // The import will be a string representing the file path
	export default value; // Export the value for import usage
}

// !media
/**
 * Declare a module for .mp4 files.
 * This module declaration allows importing .mp4 files as strings representing file paths.
 *
 * * Usage example:
 * import myVideo from './path/to/my-video.mp4';
 */
declare module "*.mp4" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .mp3 files.
 * This module declaration allows importing .mp3 files as strings representing file paths.
 *
 * * Usage example:
 * import myAudio from './path/to/my-audio.mp3';
 */
declare module "*.mp3" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

// !fonts
/**
 * Declare a module for .woff files.
 * This module declaration allows importing .woff files as strings representing file paths.
 *
 * * Usage example:
 * import myFont from './path/to/my-font.woff';
 */
declare module "*.woff" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .woff2 files.
 * This module declaration allows importing .woff2 files as strings representing file paths.
 *
 * * Usage example:
 * import myFont from './path/to/my-font.woff2';
 */
declare module "*.woff2" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .eot files.
 * This module declaration allows importing .eot files as strings representing file paths.
 *
 * * Usage example:
 * import myFont from './path/to/my-font.eot';
 */
declare module "*.eot" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .ttf files.
 * This module declaration allows importing .ttf files as strings representing file paths.
 *
 * * Usage example:
 * import myFont from './path/to/my-font.ttf';
 */
declare module "*.ttf" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .otf files.
 * This module declaration allows importing .otf files as strings representing file paths.
 *
 * * Usage example:
 * import myFont from './path/to/my-font.otf';
 */
declare module "*.otf" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

// !other
/**
 * Declare a module for .pdf files.
 * This module declaration allows importing .pdf files as strings representing file paths.
 *
 * * Usage example:
 * import myPdf from './path/to/my-document.pdf';
 */
declare module "*.pdf" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}

/**
 * Declare a module for .txt files.
 * This module declaration allows importing .txt files as strings representing file paths.
 *
 * * Usage example:
 * import myText from './path/to/my-text.txt';
 */
declare module "*.txt" {
	const src: string; // The import will be a string representing the file path
	export default src; // Export the value for import usage
}
