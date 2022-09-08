# Udagram - Image filter project

This project is part of a Udacity Cloud Developer Nanodegree I am doing.

The objective is to implement a Nodejs program that accepts an image url and filters the image from the from the url and returns the image as the response

## Lessons Learned

- API development with Nodejs and Express
- Deploying an application using AWS Elastic Beanstalk
- Working with the AWS CLI tool
- Working with TypeScript in a Nodejs project

## Screenshots

Deployed via aws cli

![Deploy via CLI](https://raw.githubusercontent.com/hellodun/image-filter/main/deployment_screenshots/eb_create_cli.png)

---

Deployment Status in Elastic Beanstalk

![Deploy via CLI](https://raw.githubusercontent.com/hellodun/image-filter/main/deployment_screenshots/eb_deplotmentStatus.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/hellodun/image-filter.git
```

Go to the project directory

```bash
  cd image-filter
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Deployment

Note: AWS CLI tool should be installed

To deploy this project run

```bash
  cd image-filter
  npm run build
  eb init
  eb create
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
