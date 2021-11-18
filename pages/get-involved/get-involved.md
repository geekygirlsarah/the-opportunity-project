---
title: Get Involved
permalink: /get-involved/
class: get-involved
layout: default

# full span, top of page section
hero:
  text: Ready to Solve the Nation’s Greatest Challenges?
  subtext: Join our community of innovators using government data to build digital tools with, by, and for the people. We offer ongoing opportunities to connect to The Opportunity Project throughout the year. 

# connecting-banner-with-subheader-inverse.html
banner-subheader-inverse:
  top:
    background: base-darkest
    line: '-light'
  bottom:
    background: white

content-light:
  title: Participate in TOP
  skip-top-border: true
  skip-bottom-border: true
  body: Sprints are 12-week product development cycles where we bring together tech teams and collaborators to build digital products using open data.
  right-col: participate-right.md

join:
  title: Stay in the Loop
  skip-top-border: true
  skip-bottom-border: true
  right-col: in-the-loop-right.md

callout:
  id: prize-challenge
  container-class: maxw-desktop
  title: 
    text: Win Funding to Scale Your Technology
  body: 'Submissions for the [Open Data For Good Challenge](https://www.challenge.gov/challenge/open-data-for-good-grand-challenge/) are now closed. The challenge will award $310,000 to teams who have created products using The Opportunity Project process.


To view the Challenge timeline, visit the [prize challenge page](SITE.BASEURL/prize-challenge). Submissions closed on October 24, 2021.'
  primary:
    text: View the Rules
    href: https://www.challenge.gov/challenge/open-data-for-good-grand-challenge/
    isExternal: true
  secondary: 
    text: View the timeline
    href: /prize-challenge/

---
{% include hero.html %}
{% include connecting-banner-with-subheader-inverse.html %}

{% capture left-col %}
  {% include image.html src="photos/get-involved/stickies.jpg" alt="Image of a man at a table with sticky notes" %}
{% endcapture %}
{% capture right-col %}
  {% include_relative {{ page.content-light.right-col }} %}
{% endcapture %}
{% include two-column-markdown.html content=page.content-light left-col=left-col%}

{% include home/cta.html data=page.callout %}

{% capture left-join %}
  {% include image.html src="photos/get-involved/arrow.jpg" alt="Illustration of an arrow pointing to the right over a navy blue field" %}
{% endcapture %}
{% capture right-join %}
  {% include_relative {{ page.join.right-col }} %}
{% endcapture %}
{% include two-column-markdown.html content=page.join left-col=left-join right-col=right-join %}
