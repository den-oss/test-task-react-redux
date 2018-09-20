import mockRequest from 'mock-request'

let mockFn;

/*
mockFn = mockRequest.mock()
    .get('/api/profile')
    .respond({
        statusCode: 200,
        body: { success: true, data: { firstName: "denis" } }
    })
    .run();
*/

export default (rpOpts) => {
    return new Promise((resolve, reject) => {
        if (!mockFn)
            throw new Error("Need to setup mock api");
        mockFn(rpOpts, (err, res, body) => {
            if (err)
                return reject(err);
            let resp;
            if (rpOpts.json) {
                let json;
                try {
                    json = JSON.parse(body);
                } catch (err1) {
                    return reject(new Error("Can't parse as JSON: " + err1.message));
                }
                resp = json;
            } else {
                resp = body;
            }
            return resolve(resp);
        });
    });
};

export function setupMock(setup) {
    mockFn = setup(mockRequest);
}
