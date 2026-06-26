/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chapter {
  id: string;
  title: string;
  content: string;
  description: string;
}

export interface AppState {
  currentChapterId: string;
  isSidebarOpen: boolean;
}
