//
//  ViewController.m
//  AthenaMessageExample
//
//  Created by Leon Tse on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface ViewController ()
@property RCTBridge *bridge;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];


}
- (IBAction)didTapButton:(id)sender {
    NSURL *jsCodeLocation;
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    self.bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                        moduleProvider:nil
                                         launchOptions:nil];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.bridge moduleName:@"UserDetails" initialProperties:nil];
    
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    UIViewController *rnViewController = [UIViewController new];
    rnViewController.view = rootView;
    [self.navigationController pushViewController:rnViewController animated:YES];
    
    double delayInSeconds = 5.0;
    __weak __typeof(self) weakSelf = self;
    dispatch_time_t interval = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
    dispatch_after(interval, dispatch_get_main_queue(), ^(void) {
        [weakSelf.bridge.eventDispatcher sendAppEventWithName:@"UserDidLoginMsg" body:@{ @"message": @{@"username": @"hei", @"nickname": @"Awesome"} }];
    });
}

@end
