import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormatterComponent } from './dataformatter.component';

describe('DataFormatterComponent', () => {
    let component: DataFormatterComponent;
    let fixture: ComponentFixture<DataFormatterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataFormatterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataFormatterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
