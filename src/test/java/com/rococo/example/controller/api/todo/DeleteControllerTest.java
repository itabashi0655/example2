package com.rococo.example.controller.api.todo;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.slim3.tester.ControllerTestCase;

public class DeleteControllerTest extends ControllerTestCase {
    @Test
    public void run() throws Exception {

        tester.start("/api/todo/delete");
        PostController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/api/todo/post.jsp"));
    }
}
