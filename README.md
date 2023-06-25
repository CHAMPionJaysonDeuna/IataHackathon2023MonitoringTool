# IataHackathon2023MonitoringTool
Cargo Data Monitoring Portal integrated with OneRecord.
Our hackathon solution offers a low-cost, ecosystem-free approach for third-party partners, utilizing a mobile phone camera without the need for app installation. It extends the capabilities of existing products and seamlessly integrates data with IATA ONE Record. With real-time door-to-door visibility and enhanced IoT capabilities, stakeholders can track shipments, monitor their location, and ensure proper temperature management. This solution revolutionizes logistics by providing cost-effective, adaptable, and efficient tracking and monitoring options for the industry.

Architecture:
Our solution utilizes CHAMP's existing products, Shipply.Vision and CDMP Monitoring Tool, and integrating it to IATA ONE Record.
![Solution Architecture](https://github.com/CHAMPionJaysonDeuna/IataHackathon2023MonitoringTool/assets/137651794/bc2eb54d-e636-40ad-840a-88775b5077e0)

CDMP Monitoring Tool can monitor airport-to-airport events in real time, thus allowing station managers or the local GHAs to immediately address shipments that are about to fail or in failure  to improve their performance. Our solution will extend Monitoring Tool to display door-to-door events by fetching data from ONE Record.

The source codes show that we are able to fetch OneRecord shipment event updates and incorporate them into CDMP.
We added the Door-to-Door milestones events into our existing Air-to-Air milestone traking and monitoring.
Additionally, we provided a link to Cumul.io Dashboard to provide important shipment details like Geolocation, Temperature, the remaining battery of the IoT tag.



