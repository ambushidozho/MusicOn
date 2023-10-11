/** Class representing a Component. */
export class Component {
	protected parent: HTMLElement;
	protected config: Object;
	/**
     * Sets parent and config.
     * @param {HTMLElement} parent
     * @param {Object} config 
     */
	constructor(parent: HTMLElement, config: Object) {
        this.parent = parent;
        this.config = config;
    }

	/**
     * Get the config.
     * @return {Object} config.
     */
	public get Config(): Object {
		return this.config;
	}

	/**
     * Set the config.
     * @param {Object} config.
     */
	public set Config(config: Object) {
		this.config = config;
	}
}


export function loadTemplate(url: string): Promise<string> {
     return fetch(url)
       .then(response => {
         if (!response.ok) {
           throw new Error(`Failed to load template: ${url}`);
         }
         return response.text();
       });
   }