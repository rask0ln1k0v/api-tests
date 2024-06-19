# Performance Test Plan for JSONPlaceholder API

## Objective

The goal of this performance testing plan is to evaluate the performance and stability of the JSONPlaceholder API under various load conditions. The focus will be on identifying the breaking points and load capacity of the following routes:
- `GET /posts`
- `POST /posts`
- `PUT /posts/{id}`
- `DELETE /posts/{id}`

## Tools and Environment

1. **Load Testing Tool**: 
   - **Apache JMeter**: A popular open-source tool for performance testing.
   - **k6**: A modern, developer-centric load testing tool built on Go, which offers great scripting capabilities with JavaScript.

2. **APM Tool**: 
   - **New Relic**: To monitor performance metrics such as response time, throughput, and error rates in real-time.
   - **Datadog**: For comprehensive monitoring and analysis.

3. **Test Environment**:
   - Use a staging environment that mirrors the production setup.
   - Ensure the environment has similar configurations and resources as the production environment.

## Test Scenarios

### Scenario 1: GET /posts
- **Load Profile**: 
  - Ramp-Up: Increase from 0 to 100 users over 1 minute.
  - Steady State: Maintain 100 users for 3 minutes.
  - Ramp-Down: Decrease from 100 to 0 users over 1 minute.
- **Metrics to Monitor**: Response time, throughput, error rate, and CPU/memory usage.

### Scenario 2: POST /posts
- **Load Profile**:
  - Ramp-Up: Increase from 0 to 50 users over 1 minute.
  - Steady State: Maintain 50 users for 3 minutes.
  - Ramp-Down: Decrease from 50 to 0 users over 1 minute.
- **Metrics to Monitor**: Response time, throughput, error rate, and CPU/memory usage.

### Scenario 3: PUT /posts/{id}
- **Load Profile**:
  - Ramp-Up: Increase from 0 to 50 users over 1 minute.
  - Steady State: Maintain 50 users for 3 minutes.
  - Ramp-Down: Decrease from 50 to 0 users over 1 minute.
- **Metrics to Monitor**: Response time, throughput, error rate, and CPU/memory usage.

### Scenario 4: DELETE /posts/{id}
- **Load Profile**:
  - Ramp-Up: Increase from 0 to 50 users over 1 minute.
  - Steady State: Maintain 50 users for 3 minutes.
  - Ramp-Down: Decrease from 50 to 0 users over 1 minute.
- **Metrics to Monitor**: Response time, throughput, error rate, and CPU/memory usage.

## Identifying Breaking Points

1. **Load Testing**:
   - Gradually increase the number of concurrent users until the API starts to fail or degrade significantly.
   - Note the maximum number of concurrent users the API can handle before performance issues arise.

2. **Stress Testing**:
   - Continue to increase the load beyond normal operational capacity to identify the breaking points.

3. **Endurance Testing**:
   - Run tests for an extended period (e.g., 1-2 hours) to identify any memory leaks or performance degradation over time.

## Observations and Analysis

1. **Response Time**:
   - Monitor response times under different loads and identify the point at which response times become unacceptable.

2. **Throughput**:
   - Measure the number of requests processed per second and determine the maximum throughput.

3. **Error Rate**:
   - Track error rates to determine the stability of the API under load.

4. **Resource Utilization**:
   - Use APM tools to monitor CPU, memory, and network usage to identify resource bottlenecks.

## Reporting

1. **Test Results**:
   - Document the response times, throughput, error rates, and resource utilization under different load conditions.
   - Provide charts and graphs to visualize performance metrics.

2. **Analysis**:
   - Analyze the test results to identify performance bottlenecks and breaking points.
   - Provide recommendations for improving performance.

## Example Script Using k6

Here's an example script for `k6` to test the `GET /posts` endpoint:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // ramp-up to 100 users
    { duration: '3m', target: 100 }, // stay at 100 users
    { duration: '1m', target: 0 },   // ramp-down to 0 users
  ],
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status was 200': (r) => r.status === 200,
    'response time was less than 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);

}
