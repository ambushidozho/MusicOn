import { Album, Song } from '../../types';
import template from './CollectionComponentTemplate.hbs';
import IComponent from '../IComponent/IComponent';
import hosts from '../../HostConsts';

/** Class representing a CollectionComponent. */
export class CollectionComponent extends IComponent {
	private songs: Array<Song> = [];

	/**
	 * Constructs a new instance of the class.
	 *
	 * @param {HTMLElement} parent - The parent element.
	 * @param {Array<Song>} songs - The array of songs.
	 */
	constructor(parent: HTMLElement, songs: Array<Song>) {
		super(parent, template({ Tracks: songs, port: hosts.s3HOST }));
		this.songs = songs;
	}

	/**
	 * Returns an array of songs.
	 *
	 * @return {Array<Song>} An array of songs.
	 */
	public get Songs(): Array<Song> {
		return this.songs;
	}

	/**
	 * Set the value of the Songs property.
	 *
	 * @param {Array<Song>} songs - An array of songs to be set.
	 */
	public set Songs(songs: Array<Song>) {
		this.songs = songs;
		this.renderContent();
	}

	/**
	 * Renders the content of the element.
	 *
	 * @return {void} 
	 */
	public renderContent(): void {
		this.parent.innerHTML = '';
		this.parent.innerHTML = template({ Tracks: this.songs, port: hosts.s3HOST });
	}
}
