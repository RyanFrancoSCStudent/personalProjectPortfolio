import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
    programming = [
    'Java',
    'Python',
    'Angular',
    'Spring Boot',
    'HTML/CSS',
    'User Input/Scanner',
    'Object Oriented Programming',
    'JavaScript',
    'Microsoft Visual Studio',
    'Unity',
    'C#'
  ];

  operatingSystems = [
    'UNIX',
    'Apple macOS',
    'Microsoft Windows',
    'Oracle Solaris'
  ];

  networkTechnologies = [
    'Amazon AWS',
    'Cisco',
    'Internet Protocols',
    'Network Layers (OSI Model)',
    'Handshake Model',
    'LAN & WAN',
    'TCP/IP & DHCP',
    'SSH',
    'Route Tables & Subnets',
    'VPC’s',
    'Security Groups',
    'IPv4',
    'NACLs'
  ];

  databaseAdministration = [
    'Oracle',
    'MongoDB (NoSQL)',
    'MySQL',
    'Oracle PL/SQL'
  ];

  virtualMachines = [
    'Hyper-V',
    'VMware',
    'VirtualBox'
  ];

  linuxFileSystems = [
    'CLI',
    'GUI'
  ];
}
