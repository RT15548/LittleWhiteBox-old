/**
 * AccountStorage compatibility layer for SillyTavern 1.12.11
 * 
 * This module provides a compatibility layer that mimics the AccountStorage functionality
 * using localStorage, allowing LittleWhiteBox plugin to work with SillyTavern 1.12.11
 * without requiring the missing AccountStorage.js file.
 */

class AccountStorageCompat {
    constructor() {
        this.prefix = 'ST_AccountStorage_';
    }

    /**
     * Get an item from storage
     * @param {string} key - The key to retrieve
     * @returns {string|null} The stored value or null if not found
     */
    getItem(key) {
        try {
            return localStorage.getItem(this.prefix + key);
        } catch (error) {
            console.warn('[AccountStorage Compat] Failed to get item:', key, error);
            return null;
        }
    }

    /**
     * Set an item in storage
     * @param {string} key - The key to store
     * @param {string} value - The value to store
     * @returns {boolean} True if successful, false otherwise
     */
    setItem(key, value) {
        try {
            localStorage.setItem(this.prefix + key, value);
            return true;
        } catch (error) {
            console.warn('[AccountStorage Compat] Failed to set item:', key, error);
            return false;
        }
    }

    /**
     * Remove an item from storage
     * @param {string} key - The key to remove
     * @returns {boolean} True if successful, false otherwise
     */
    removeItem(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.warn('[AccountStorage Compat] Failed to remove item:', key, error);
            return false;
        }
    }

    /**
     * Clear all items with our prefix
     * @returns {boolean} True if successful, false otherwise
     */
    clear() {
        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keys.push(key);
                }
            }
            keys.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.warn('[AccountStorage Compat] Failed to clear storage:', error);
            return false;
        }
    }

    /**
     * Get all keys with our prefix
     * @returns {string[]} Array of keys (without prefix)
     */
    keys() {
        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    keys.push(key.substring(this.prefix.length));
                }
            }
            return keys;
        } catch (error) {
            console.warn('[AccountStorage Compat] Failed to get keys:', error);
            return [];
        }
    }

    /**
     * Check if a key exists
     * @param {string} key - The key to check
     * @returns {boolean} True if key exists, false otherwise
     */
    hasItem(key) {
        return this.getItem(key) !== null;
    }
}

// Create and export the compatibility instance
export const accountStorage = new AccountStorageCompat();

// Also export as default for different import styles
export default accountStorage;
