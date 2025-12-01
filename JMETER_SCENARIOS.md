# JMeter Performance Test Scenarios

This document outlines the performance test scenarios configured in `StudentManagementSystem_LoadTest.jmx`.

## Test Configuration
- **Thread Group**: TG_AdminUsers
- **Users (Threads)**: 50
- **Ramp-up Period**: 30 seconds
- **Loop Count**: 2

## Test Scenarios (Samplers)
Each scenario includes a **Response Assertion** to verify the server returns HTTP 200 OK.

1.  **GET /login**: Simulate user accessing the login page.
2.  **GET /dashboard**: Simulate user accessing the dashboard.
3.  **GET /students**: Retrieve list of students.
4.  **GET /classes**: Retrieve list of classes.
5.  **GET /grades**: Retrieve list of grades.
6.  **GET /enrollment**: Retrieve enrollment data.
7.  **GET /reports**: Access reports page.
8.  **GET /settings**: Access settings page.

## Execution Instructions
To run this test plan (requires JMeter installed):

```bash
jmeter -n -t StudentManagementSystem_LoadTest.jmx -l results.jtl
```

## Expected Results
- **Throughput**: > 100 requests/second (for static content serving).
- **Error Rate**: 0%.
- **Response Time**: < 500ms (90th percentile).
