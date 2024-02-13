import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

    public users: User[] = [];

    public editUser: User | null | undefined;

    public deleteUser: User | null | undefined;

    isBlocked: boolean = false;

    private getUsersSubscription: Subscription = new Subscription();
    private addUserSubscription: Subscription = new Subscription();
    private updateUserSubscription: Subscription = new Subscription();
    private deleteUserSubscription: Subscription = new Subscription();

    ngOnInit(): void {
        this.getUsers();
    }

    ngOnDestroy(): void {
        this.getUsersSubscription.unsubscribe();
        this.addUserSubscription.unsubscribe();
        this.updateUserSubscription.unsubscribe();
        this.deleteUserSubscription.unsubscribe();
    }

    constructor(private userService: UserService) { }

    public onOpenModal(user: User | null, mode: string): void {
        const container: HTMLElement | null = document.getElementById('main-container');

        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
            button.setAttribute('data-target', '#addUserModal');
        }
        if (mode === 'edit') {
            this.editUser = user;
            button.setAttribute('data-target', '#editUserModal');
        }
        if (mode === 'delete') {
            this.deleteUser = user;
            button.setAttribute('data-target', '#deleteUserModal');
        }
        // @ts-ignore
        container.appendChild(button);
        button.click();
    }

    public getUsers(): void {
        this.userService.getUsers()
            .subscribe({
                next: res => {
                    this.users = res;
                },
                error: err => {
                    alert(err.message);
                }
            });
    }

    public onAddUser(addForm: NgForm): void {
        // @ts-ignore
        document.getElementById('add-user-form').click();
        this.userService.addUser(addForm.value).subscribe({
            next: (response: User): void => {
                console.log(response);
                this.getUsers();
                addForm.reset();
            },
            error: (error: HttpErrorResponse): void => {
                alert(error.message);
                addForm.reset();
            },
        });
    }

    public onUpdateUser(user: User): void {
        this.userService.updateUser(user).subscribe({
            next: (response: User): void => {
                console.log(response);
                this.getUsers();
            },
            error: (error: HttpErrorResponse): void => {
                alert(error.message);
            },
        });
    }

    public onDeleteUser(userId: number | undefined): void {
        // @ts-ignore
        this.userService.deleteUser(userId).subscribe({
            next: (response: void): void => {
                console.log(response);
                this.getUsers();
            },
            error: (error: HttpErrorResponse): void => {
                alert(error.message);
            },
        });
    }

    public searchUsers(key: string): void {
        const results: User[] = [];
        for (const user of this.users) {
            if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(user);
            }
        }
        this.users = results;
        if (results.length === 0 || !key) {
            this.getUsers();
        }
    }

}
