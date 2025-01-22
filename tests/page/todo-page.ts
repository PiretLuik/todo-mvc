import {expect, Locator, Page} from "@playwright/test";

export class TodoPage {

    readonly url = 'https://todo-app.tallinn-learning.ee/'
    readonly page: Page
    readonly pageLogo: Locator
    readonly inputField: Locator
    readonly buttonSelectAll: Locator
    readonly buttonSelectTask: Locator
    readonly buttonDeleteTask: Locator
    readonly todoItemLabel: Locator
    readonly taskCounter: Locator
    readonly filterAll: Locator
    readonly filterActive: Locator
    readonly filterCompleted: Locator
    readonly buttonClearCompletedTasks: Locator
    readonly footerLink: Locator
    readonly todoList: Locator
    readonly todoItem: Locator

    constructor(page: Page) {
        this.page = page;
        this.pageLogo = page.getByTestId('header');
        this.inputField = page.getByTestId('text-input');
        this.buttonSelectAll = page.getByTestId('toggle-all');
        this.buttonSelectTask = page.getByTestId('todo-item-toggle');
        this.buttonDeleteTask = page.getByTestId('todo-item-button');
        this.todoItemLabel = page.getByTestId('todo-item-label');
        this.taskCounter = page.getByTestId('footer-navigation');
        this.filterAll = page.getByRole('link', {name: 'All'});
        this.filterActive = page.getByRole('link', {name: 'Active'});
        this.filterCompleted = page.getByRole('link', {name: 'Completed'});
        this.buttonClearCompletedTasks = page.getByRole('button', {name: 'Clear completed'})
        this.footerLink = page.getByRole('link', {name: 'TodoMVC'});
        this.todoList = page.getByTestId('todo-list');
        this.todoItem = page.getByTestId('todo-item');
    }

    async openToDoPage() {
        await this.page.goto(this.url)
    }

    async counterToDoItems() {
        return await this.todoItemLabel.count()
    }

    async deleteToDoTaskByName(taskName: string) {
        const taskToDelete = await this.page.getByText(taskName)
        await taskToDelete.hover()
        await this.buttonDeleteTask.click()
    }

    async completeToDoTaskByName(taskName: string) {
        await this.page.locator('div').filter({hasText: taskName}).getByTestId('todo-item-toggle').click()
    }

    async checkCompletedToDoTaskByName(taskName: string) {
        const completedTask = await this.page.locator('div').filter({hasText: taskName}).getByTestId('todo-item-toggle')
        const liClass = this.page.getByRole('listitem').filter({has: completedTask});
        await expect(liClass).toHaveClass("completed")
        //completedTask.locator('..').locator('..')//go to parent locator two times
    }
}