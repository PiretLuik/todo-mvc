import {expect, test} from "@playwright/test";
import {TodoPage} from "./todo-page";

let todoPage: TodoPage

test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page)
    await todoPage.openToDoPage()
})

test('Has title', async () => {
    await expect(todoPage.pageLogo).toBeVisible()
});

test('create new ToDo task', async () => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    expect(await todoPage.counterToDoItems()).toBe(1)
});

test('delete ToDo task by name', async () => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.deleteToDoTaskByName('newTask')
    expect(await todoPage.counterToDoItems()).toBe(0)
});

test('complete ToDo task by name', async () => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await todoPage.completeToDoTaskByName('newTask')
    await todoPage.checkCompletedToDoTaskByName('newTask')
});

test('buttons All, Active, Completed, Clear are visible ', async () => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await expect.soft(todoPage.filterAll).toBeVisible()
    await expect.soft(todoPage.filterActive).toBeVisible()
    await expect.soft(todoPage.filterCompleted).toBeVisible()
    await expect.soft(todoPage.buttonClearCompletedTasks).toBeVisible()
});

test('set all tasks as completed and clear completed', async () => {
    await todoPage.inputField.fill('newTask1')
    await todoPage.inputField.press('Enter')
    await todoPage.inputField.fill('newTask2')
    await todoPage.inputField.press('Enter')
    await todoPage.buttonSelectAll.click()

    const todoItems = todoPage.todoItem
    for (let i = 0; i < await todoItems.count(); i++) {
        const itemToggle = todoItems.nth(i).locator(todoPage.buttonSelectTask);
        await expect.soft(itemToggle).toBeChecked();
    }
    await todoPage.checkCompletedToDoTaskByName('newTask1')
    await todoPage.checkCompletedToDoTaskByName('newTask2')

    await todoPage.buttonClearCompletedTasks.click()
    await expect(todoPage.todoItem.count()).resolves.toBe(0);
});