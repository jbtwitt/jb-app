import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = [
    {
      title: "Home Cam",
      route: "/monitor",
      icon: "videocam",
    },
    {
      title: "My Exercise",
      route: "at-collection",
      icon: "fitness_center",
    },
    {
      title: "My Bookmarks",
      route: "bookmarks",
      icon: "bookmarks",
    },
    {
      title: "My Portfolio",
      route: "portfolio",
      icon: "score",
    },
    {
      title: "My HQ High Low",
      route: "hqhl",
      icon: "bar_chart",
    },
    {
      title: "My Ledger",
      route: "ledger",
      icon: "list",
    },
    {
      title: "Hq Play",
      route: "hqplay",
      icon: "speed",
    },
    {
      title: "Hq Scan",
      route: "hqscan",
      icon: "scanner",
    },
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
