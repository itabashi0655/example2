package com.rococo.example.controller.api.todo;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class PostControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/api/todo/post");
        PostController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/api/todo/post.jsp"));
    }
}
