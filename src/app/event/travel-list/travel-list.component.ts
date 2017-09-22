import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventRepository } from '../event-repository.service';
import { EventPagination } from '../event-pagination.service';
import { Travel, EventPager } from '../interfaces/_index';

@Component({
    selector: 'app-travel-list',
    templateUrl: './travel-list.component.html',
    styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {
    travels: Travel[];
    filter: string;

    public get pager() {
        return this._pagination.pager;
    }

    constructor(
        private _eventRepository: EventRepository,
        private _route: ActivatedRoute,
        private _pagination: EventPagination
    ) {}

    ngOnInit() {
        this.travels =
            this._route.snapshot.data['type'] === 'offer'
                ? this._eventRepository.offers
                : this._eventRepository.requests;
        this._pagination.setPager(this.travels.length, 1);
    }

    public setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this._pagination.setPager(this.pager.totalItems, page);
    }
}
